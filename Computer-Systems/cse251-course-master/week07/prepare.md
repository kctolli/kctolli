![](../site/banner.png)

# 07 Prepare: Asynchronous Processes


## Overview

This week we will learn about asynchronous processing with process pools.  Please read the provided links for details on this topic.

## Preparation Material

### Links to Articles

- [What is asynchronous processing?](https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean)
- [Difference between Synchronous and Asynchronous programming](https://www.geekinsta.com/difference-between-synchronous-and-asynchronous-programming/)
- [Python documentation - search for "apply_async"](https://docs.python.org/3/library/multiprocessing.html)

## Asynchronous vs Synchronous Programming

In programming, synchronous operations block instructions until the task is completed, while asynchronous operations can execute without blocking other operations. Asynchronous operations are generally completed by firing an event or by calling a provided callback function.


**Asynchronous != Parallelism**

It's important to understand that asynchronous program is not parallelism.  It's concurrency.

### Coding examples using Process pools

#### Example 1

In this first example, we are using the `map()` function to map a list to a function.  Note that we need to get all of the data in a list before the call to the `map()` function and that the `map()` call is synchronous meaning that it doesn't return until the function is finished.

We will be using the function `apply_async()` with process pools for this week's assignment. Review the coding example below and the linked articles above in this document.

```python
# Cube example using a pool map

import multiprocessing as mp 

import os, sys
sys.path.append('../code')
from cse251 import *

def sum_all_values(x):
    total = 0
    for i in range(1, x + 1):
        total += i
    return total

if __name__ == "__main__":
    log = Log(filename_log='map.log', show_terminal=True)
    log.start_timer()
    pool = mp.Pool(4)
    results = pool.map(sum_all_values, range(100000000, 100000000 + 100))
    log.stop_timer('Finished: ')
    print(results)
```

Output:

```
12:13:39| Finished:  = 234.72213530
```

#### Example 2

This second example is using the function `apply_async()`  It is asynchronous meaning that the function will return before the processes are finished processes the data.

```python
# Cube example using pool apply_asyc()

import multiprocessing as mp 

import os, sys
sys.path.append('../code')
from cse251 import *

def sum_all_values(x):
    total = 0
    for i in range(1, x + 1):
        total += i
    return total
    
if __name__ == "__main__":
    log = Log(filename_log='apply_async.log', show_terminal=True)
    log.start_timer()
    pool = mp.Pool(4)
    results = [pool.apply_async(sum_all_values, args=(x,)) for x in range(10000, 10000 + 10)]

	# do something else

    output = [p.get() for p in results]
    log.stop_timer('Finished: ')
    print(output)

```

output:

```
11:54:15| Finished:  = 0.98407470
[50005000, 50015001, 50025003, 50035006, 50045010, 50055015, 50065021, 50075028, 50085036, 50095045]
```


Review of the program example above:


the `results` variable is a list of "future" work by the process pool.  This statement is quick to run as once the list is complete, Python will run the next line in your program.  At this point, some of the processes in the pool are starting to process the data.

```python
results = [pool.apply_async(sum_all_values, args=(x,)) for x in range(10000, 10000 + 10)]
```

With this next statement, the program is now collecting the results of the process pool.  If the pool is finished processing all of the data, then this statement is quick.  However, if any process in the pool is still doing work, then this statement is synchronous (ie., waits for the pool to finish)

```python
output = [p.get() for p in results]
```

#### Example 3

Here is the same program from example 2, however it is processing a larger range of values.  I this case, Python throws a RuntimeError.  I'm not sure why this is.  I think that the code creates two many asynchronous requests.


```python
# Cube example using pool apply_asyc()

import multiprocessing as mp 

import os, sys
sys.path.append('../code')
from cse251 import *

def sum_all_values(x):
    total = 0
    for i in range(1, x + 1):
        total += i
    return total
    
if __name__ == "__main__":
    log = Log(filename_log='apply_async.log', show_terminal=True)
    log.start_timer()
    pool = mp.Pool(4)
    results = [pool.apply_async(sum_all_values, args=(x,)) for x in range(100000000, 100000000 + 100)]
    output = [p.get() for p in results]
    log.stop_timer('Finished: ')
    print(output)
```

Output:

```
Traceback (most recent call last):
  File "c:\Users\comeaul\OneDrive - BYU-Idaho\Courses\CSE251\course-notes\week07\cube2.py", line 18, in <module>
    results = [pool.apply_async(sum_all_values, args=(x,)) for x in range(10000000, 100000000 + 100)]
  File "c:\Users\comeaul\OneDrive - BYU-Idaho\Courses\CSE251\course-notes\week07\cube2.py", line 18, in <listcomp>
    results = [pool.apply_async(sum_all_values, args=(x,)) for x in range(10000000, 100000000 + 100)]
  File "C:\Users\comeaul\AppData\Local\Programs\Python\Python39\lib\multiprocessing\pool.py", line 456, in apply_async
    result = ApplyResult(self, callback, error_callback)
  File "C:\Users\comeaul\AppData\Local\Programs\Python\Python39\lib\multiprocessing\pool.py", line 746, in __init__
    self._event = threading.Event()
  File "C:\Users\comeaul\AppData\Local\Programs\Python\Python39\lib\threading.py", line 522, in __init__
    self._cond = Condition(Lock())
RuntimeError: can't allocate lock
```


#### Example 4

To get past the above run-time error and to still use the `apply_async()` function, there is an option to use a call back function.  The way that this works if that instead of having all of the tasks in a list and the results in a list, as each process finishes their job with the data, the call back function is called.  In this call back function, you can collect the results - one at a time for the process pool.

When we have processes, global variables can't be used because they each have their own version of the GIL.  When using the call back function feature, that call back function is running in the main thread of the program where it can use any global variables of the program.

In order to know when the pool is finished, you need to have the statements `pool.close()` and `pool.join()`.

```python
# Cube example using pool apply_asyc() and callback function

import multiprocessing as mp
import time

import os, sys
sys.path.append('../code')
from cse251 import *

result_list = []

def sum_all_values(x):
    total = 0
    for i in range(1, x + 1):
        total += i
    return total

def log_result(result):
    # This is called whenever sum_all_values(i) returns a result.
    # result_list is modified only by the main process, not the pool workers.
    result_list.append(result)

def apply_async_with_callback():
    log = Log(filename_log='callback.log', show_terminal=True)
    log.start_timer()
    pool = mp.Pool(4)

    log.step_timer('Before For loop')
    for i in range(100000000, 100000000 + 100):
        pool.apply_async(sum_all_values, args = (i, ), callback = log_result)
    log.step_timer('After For loop')

	# Do something while the processes are doing their work

	# Need to know when the pool is finished
    pool.close()
    pool.join()

    log.stop_timer('Finished: ')

	# display the global variable of the results from the pool
    print(result_list)

if __name__ == '__main__':
    apply_async_with_callback()
```

Output:

Notice that the `for` loop was quick to get the data to the process pool.

```
12:18:57| Before For loop = 0.10709840
12:18:57| After For loop = 0.11021600
12:22:12| Finished:  = 195.08828210
```

#### Example 5

Once a process pool is created, you are free to add jobs to the pool any time in your program as long as it's before calling `pool.close()` and `pool.join()`.  Here is an example where the program adds a job to the pool after sleeping a little while.

The advantage of using a call back function with the process pool is that the program doesn't need to have all of the data collected in order for the pool to start doing something.

```python
# Cube example using pool apply_asyc() and callback function

import multiprocessing as mp
import time

import os, sys
sys.path.append('../code')
from cse251 import *

result_list = []

def sum_all_values(x):
    total = 0
    for i in range(1, x + 1):
        total += i
    return total

def log_result(result):
    # This is called whenever sum_all_values(i) returns a result.
    # result_list is modified only by the main process, not the pool workers.
    result_list.append(result)

def apply_async_with_callback():
    log = Log(filename_log='callback.log', show_terminal=True)
    log.start_timer()
    pool = mp.Pool(4)

    # Add job to the pool
    pool.apply_async(sum_all_values, args = (100000000, ), callback = log_result)
    
    time.sleep(1)       # Do something - this is the main thread sleeping

    pool.apply_async(sum_all_values, args = (100000001, ), callback = log_result)

    time.sleep(1)       # Do something

    pool.apply_async(sum_all_values, args = (100000002, ), callback = log_result)

    time.sleep(1)       # Do something

    pool.apply_async(sum_all_values, args = (100000003, ), callback = log_result)

	# Do something while the processes are doing their work

	# Need to know when the pool is finished
    pool.close()
    pool.join()

    log.stop_timer('Finished: ')

	# display the global variable of the results from the pool
    print(result_list)

if __name__ == '__main__':
    apply_async_with_callback()
```

Output:

```
12:29:59| Finished:  = 8.19670030
[5000000050000000, 5000000150000001, 5000000250000003, 5000000350000006]
```
