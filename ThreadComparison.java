import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.LongAdder;
import java.util.function.Supplier;

/**
 * Compares the cost (in nanoseconds) of different ways to create and run a thread:
 *   1. extends Thread
 *   2. implements Runnable
 *   3. Lambda (new Thread(() -> ...))
 *   4. Thread.ofPlatform()
 *   5. Thread.ofVirtual()
 *
 * Requires Java 21+.
 * Run:  javac ThreadComparison.java && java ThreadComparison
 *
 * For each approach, three averages are measured per thread:
 *   - create : time to build the (unstarted) thread object
 *   - start  : time spent inside start()
 *   - total  : create + start + run + join (full lifecycle)
 */
public class ThreadComparison {

    private static final int WARMUP = 2_000;
    private static final int ITERATIONS = 10_000;

    // Shared sink so the JIT cannot eliminate the task body.
    private static final LongAdder COUNTER = new LongAdder();

    // 1. Extending Thread
    static class MyThread extends Thread {
        @Override
        public void run() {
            COUNTER.increment();
        }
    }

    // 2. Implementing Runnable
    static class MyRunnable implements Runnable {
        @Override
        public void run() {
            COUNTER.increment();
        }
    }

    record Result(String name, long avgCreateNs, long avgStartNs, long avgTotalNs) {}

    static Result measure(String name, Supplier<Thread> factory, int iterations)
            throws InterruptedException {
        long createSum = 0, startSum = 0, totalSum = 0;

        for (int i = 0; i < iterations; i++) {
            long t0 = System.nanoTime();
            Thread thread = factory.get();          // create
            long t1 = System.nanoTime();
            thread.start();                         // start
            long t2 = System.nanoTime();
            thread.join();                          // run + finish
            long t3 = System.nanoTime();

            createSum += t1 - t0;
            startSum += t2 - t1;
            totalSum += t3 - t0;
        }
        return new Result(name, createSum / iterations, startSum / iterations, totalSum / iterations);
    }

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> COUNTER.increment();

        // Name -> thread factory
        record Case(String name, Supplier<Thread> factory) {}
        List<Case> cases = List.of(
                new Case("extends Thread",        MyThread::new),
                new Case("implements Runnable",   () -> new Thread(new MyRunnable())),
                new Case("Lambda",                () -> new Thread(() -> COUNTER.increment())),
                new Case("Thread.ofPlatform()",   () -> Thread.ofPlatform().unstarted(task)),
                new Case("Thread.ofVirtual()",    () -> Thread.ofVirtual().unstarted(task))
        );

        System.out.println("Java " + System.getProperty("java.version")
                + " | warmup=" + WARMUP + " | iterations=" + ITERATIONS);
        System.out.println("Warming up...");
        for (Case c : cases) {
            measure(c.name(), c.factory(), WARMUP);
        }

        System.out.println("Measuring...\n");
        List<Result> results = new ArrayList<>();
        for (Case c : cases) {
            results.add(measure(c.name(), c.factory(), ITERATIONS));
        }

        String line = "+----------------------+---------------+---------------+------------------+";
        System.out.println(line);
        System.out.printf("| %-20s | %13s | %13s | %16s |%n",
                "Approach", "create (ns)", "start (ns)", "total (ns)");
        System.out.println(line);
        for (Result r : results) {
            System.out.printf("| %-20s | %,13d | %,13d | %,16d |%n",
                    r.name(), r.avgCreateNs(), r.avgStartNs(), r.avgTotalNs());
        }
        System.out.println(line); 
    }}