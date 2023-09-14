<h1 align="center"><I>Advanced STLs</I></h1>

<br><br><br>

## Outlines:
- **[Priority Queue](#priority-queue)**
- **[Multiset](#multiset)**
- **[Ordered Set](#ordered-set)**
- **[Additional Points](#additional-points)** (If we have time)
  - [Monotonic Stack](#monotonic-stacks) 
  - [Deque](#deque)
- [Sheet](#sheet-to-solve)
- [Session](#session-video)
 
<br>

## Priority Queue
A priority queue is a **special type of queue** in which each element is associated with a **priority value**. And, elements are served on the basis of their priority. That is, higher priority elements are served first.

However, if elements with the same priority occur, they are served according to their order in the queue.

### Assigning Priority Value
Generally, the value of the element itself is considered for assigning the priority. For example,

The element with the highest value is considered the highest priority element. However, in other cases, we can assume the element with the lowest value as the highest priority element.

We can also set priorities according to our needs.

![the element with highest priority is removed from the priority queue](https://cdn.programiz.com/sites/tutorial2program/files/Introduction.png "Priority Queue")

### Difference between Priority Queue and Normal Queue
In a queue, the **first-in-first-out rule** is implemented whereas, in a priority queue, the values are removed **on the basis of priority**. The element with the highest priority is removed first.

### Implementation of Priority Queue
A priority queue can be implemented using an array, a linked list, a heap data structure, or a binary search tree. Among these data structures, heap data structure provides an efficient implementation of priority queues.

Hence, we will be using the heap data structure to implement the priority queue in this tutorial. A max-heap is implemented in the following operations. If you want to learn more about it, please visit [max-heap and min-heap](https://www.programiz.com/dsa/heap-sort#heap).

A comparative analysis of different implementations of priority queue is given below.

### Complexity of different implementations
| Operations | peek |insert|delete
|--|--|--|--
|Linked List| $O(1)$ | $O(1)$ | $O(1)$
|Binary Heap|$O(1)$|$O(log n)$|$O(log n)$
|Binary Search Tree|$O(1)$|$O(log n)$|$O(log n)$

### Methods of Priority Queue are:
| Operations | Definition
|--|--
|<code>priority_queue::empty()</code>| Returns whether the queue is empty.
|<code>priority_queue::size()</code>| Returns the size of the queue.
|<code>priority_queue::top()</code>| Returns a reference to the topmost element of the queue.
|<code>priority_queue::push()</code>| Used to insert a new element into the priority queue container.
|<code>priority_queue::pop()</code>| Deletes the first element of the queue.

<br>

#### Problems to Solve:
- [Potions (Hard Version)](https://vjudge.net/problem/CodeForces-1526C2) -- Min Heap
- [Epic Transformation](https://vjudge.net/problem/CodeForces-1506D) -- Max Heap

<br><br>

## Multiset
### Remarks
The C++ Standard Library  `multiset`  class is:

-   An associative container, which is a variable size container that supports the efficient retrieval of element values based on an associated key value.
    
-   Reversible, because it provides bidirectional iterators to access its elements.
    
-   Sorted, because its elements are ordered by key values within the container in accordance with a specified comparison function.
    
-   Multiple in the sense that its elements don't need to have unique keys, so that one key value can have many element values associated with it.
    
-   A simple associative container because its element values are its key values.
    
-   A class template, because the functionality it provides is generic and so independent of the specific type of data contained as elements. The data type to be used is, instead, specified as a parameter in the class template along with the comparison function and allocator.
Multisets in C++ are containers that are very similar to sets. Unlike sets, multisets can store duplicate elements in a sorted manner. The elements inside the multiset cannot be changed, once they are added to the multiset, they can only be inserted or deleted. A multiset is present in  `#include<set>`  header file. The elements inside the multiset can be accessed using iterators.

![STL Set and Multiset](http://conglang.github.io/img/sets_and_multisets.png)

### Multiset Declaration

**Syntax:**

`multiset <data_type> name = { initial_values };`

`data_type`: data type of the elements to be stored inside the multiset

`initial_values`: optional parameter which initializes the multiset with the given values

**Note:**  By default, the multiset stores values in non-decreasing order. To store the values in non-increasing order, we use an inbuilt comparator function

`multiset <data_type, greater <data_type>> name;`

### Functions on multisets

-   `begin()`: Returns an iterator to the first element of the multiset.  
    **Parameters**: None  
    **Return type**: iterator  
    
-   `end()`: Returns an iterator to the element past the last element of the multiset.  
    **Parameters**: None  
    **Return type**: iterator  
    
-   `size()`: It tells us the size of the multiset.  
    **Parameters**: None  
    **Return type**: integer - total number of elements in the multiset  
    
-   `insert(element)`: Inserts an element in the multiset.  
    **Time Complexity**: $O(logN)$ where $N$ is the size of the multiset  
    **Parameters**: the element to be inserted  
    **Return type**: void  
    
-   `erase(value)`  or  `erase(start_iterator,end_iterator)`: Delete elements from the multiset.  
    **Time Complexity**: $O(logN)$ where $N$ is the size of the multiset  
    **Parameters**: the value to be removed or iterators pointing to the position between which the value needs to be deleted  
    **Return type**: void  
    
-   `find(element)`: Returns an iterator pointing to the element, if the element is found else returns an iterator pointing to the end of the multiset.  
    **Parameters**: the element which needs to be found  
    **Return type**: iterator  
    
-   `clear()`: It deletes all the elements from the multiset  
    **Parameters**: None  
    **Return type**: void  
    
-   `empty()`: It tells us whether the multiset is empty or not.  
    **Parameters**: None  
    **Return type**: Boolean, true if a multiset is empty else false

### Problems to Solve:
- [Bored Judge](https://vjudge.net/problem/Gym-101102C) -- Structure Idx
- [Playing with Arrays](https://vjudge.net/problem/Gym-397687E) -- erase without find
- [Reorder The Array](https://vjudge.net/problem/CodeForces-1007A) -- BS

<br>

## Ordered set
Ordered set is a  [policy based data structure in g++](https://www.geeksforgeeks.org/policy-based-data-structures-g/)  that keeps the  **unique**  elements in sorted order. It performs all the operations as performed by the set data structure in STL in $log(n)$ complexity and performs two additional operations also in $log(n)$ complexity.

-   **order_of_key (k)**  : Number of items, strictly smaller than $k$.
-   **find_by_order(k)**  : $K_{th}$ element in a set (counting from zero).

You can read about [policy based data structures](https://codeforces.com/blog/entry/11080) with examples
<br>

### Problems to Solve:
- [Playing With Houses V2 (hard-version)](https://vjudge.net/problem/Gym-397687D)
- [Yet Another Problem About Pairs Satisfying an Inequality](https://vjudge.net/problem/CodeForces-1703F)


## Additional Points

### Monotonic Stacks
- #### Articles to Read:
	- [Algo-en](https://labuladong.gitbook.io/algo-en/ii.-data-structure/monotonicstack)
- #### Problems to Solve:
	- [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)
	- [Previous Smaller Element](https://www.interviewbit.com/problems/nearest-smaller-element/)

### Deque
- #### Articles to Read:
	- [GeeksforGeeks](https://www.geeksforgeeks.org/deque-cpp-stl/)


## Templates

- [Monotonic Stacks](https://github.com/7oSkaaa/CP-Templates/blob/main/Monotonic_Stacks.cpp)
- [Ordered_Sets](https://github.com/7oSkaaa/CP-Templates/blob/main/Ordered_Set.cpp)



## Sheet to Solve

- [ICPC SCU Phase 2 --- Week #1](https://vjudge.net/contest/517904) 


<details>
  <summary><h3>Additional Material to Study</h3></summary>

### Videos:

- [Priority_Queue](https://www.youtube.com/watch?v=0zr0JqSw7ic)
- [Multiset](https://www.youtube.com/watch?v=iJCnqHrkPq8)
- [Orderd_Set](https://www.youtube.com/watch?v=IWyIwLFucU4)

### Articles:

- [Priority_Queue](https://www.geeksforgeeks.org/priority-queue-in-cpp-stl/?ref=gcse)
- [Multiset](https://www.geeksforgeeks.org/multiset-in-cpp-stl/?ref=gcse)
- [Orderd_Set](https://www.geeksforgeeks.org/ordered-set-gnu-c-pbds/)
	
</details>

### [Session Video](https://drive.google.com/file/d/1RWP4vxw1cpTmIfFfbrBSrFTf-eh9p5_I/view?usp=drive_link)

