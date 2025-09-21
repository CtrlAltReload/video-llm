export const courses = [
  {
    id: 1,
    title: 'Build a Full Stack React App',
    description:
      'Learn to create a complete React application with Node.js backend, authentication, and database integration.',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    originalVideoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoTitle: 'React Full Stack Tutorial - 3 Hours Complete Course',
    channel: 'Code with John',
    duration: '3h 24m',
    totalLessons: 24,
    completedLessons: 18,
    status: 'in-progress',
    progress: 75,
    tags: ['React', 'Node.js', 'Full Stack', 'JavaScript'],
    createdAt: new Date('2024-01-15'),
    lastAccessed: new Date('2024-01-20'),
    difficulty: 'intermediate',
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description:
      'Master data analysis, visualization, and machine learning with Python, pandas, and scikit-learn.',
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    originalVideoUrl: 'https://youtube.com/watch?v=rfscVS0vtbw',
    videoTitle: 'Complete Python Data Science Course - 4 Hours',
    channel: 'Data Science Pro',
    duration: '4h 12m',
    totalLessons: 32,
    completedLessons: 32,
    status: 'completed',
    progress: 100,
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas'],
    createdAt: new Date('2024-01-10'),
    lastAccessed: new Date('2024-01-18'),
    difficulty: 'beginner',
  },
  {
    id: 3,
    title: 'Vue.js 3 Composition API',
    description:
      "Deep dive into Vue 3's Composition API, state management, and modern development patterns.",
    thumbnail: 'https://img.youtube.com/vi/YrxBCBibVo0/maxresdefault.jpg',
    originalVideoUrl: 'https://youtube.com/watch?v=YrxBCBibVo0',
    videoTitle: 'Vue 3 Composition API Complete Guide - 2.5 Hours',
    channel: 'Vue Mastery',
    duration: '2h 48m',
    totalLessons: 16,
    completedLessons: 8,
    status: 'in-progress',
    progress: 50,
    tags: ['Vue.js', 'Composition API', 'JavaScript', 'Frontend'],
    createdAt: new Date('2024-01-18'),
    lastAccessed: new Date('2024-01-22'),
    difficulty: 'intermediate',
  },
  {
    id: 4,
    title: 'Docker & Kubernetes Fundamentals',
    description:
      'Learn containerization with Docker and orchestration with Kubernetes for scalable applications.',
    thumbnail: 'https://img.youtube.com/vi/3c-iBn73dDE/maxresdefault.jpg',
    originalVideoUrl: 'https://youtube.com/watch?v=3c-iBn73dDE',
    videoTitle: 'Docker & Kubernetes Tutorial - 5 Hour Complete Course',
    channel: 'DevOps Academy',
    duration: '5h 16m',
    totalLessons: 28,
    completedLessons: 4,
    status: 'in-progress',
    progress: 14,
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
    createdAt: new Date('2024-01-22'),
    lastAccessed: new Date('2024-01-23'),
    difficulty: 'advanced',
  },
  {
    id: 5,
    title: 'JavaScript ES6+ Modern Features',
    description:
      'Master modern JavaScript features including async/await, destructuring, modules, and more.',
    thumbnail: 'https://img.youtube.com/vi/nZ1DMMsyVyI/maxresdefault.jpg',
    originalVideoUrl: 'https://youtube.com/watch?v=nZ1DMMsyVyI',
    videoTitle: 'Modern JavaScript ES6+ Complete Course - 2 Hours',
    channel: 'JavaScript Pro',
    duration: '2h 15m',
    totalLessons: 18,
    completedLessons: 18,
    status: 'completed',
    progress: 100,
    tags: ['JavaScript', 'ES6', 'Modern JS', 'Frontend'],
    createdAt: new Date('2024-01-08'),
    lastAccessed: new Date('2024-01-14'),
    difficulty: 'intermediate',
  },
  {
    id: 6,
    title: 'Next.js 14 App Router',
    description:
      'Build modern web applications with Next.js 14, including server components and the new app router.',
    thumbnail: 'https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    originalVideoUrl: 'https://youtube.com/watch?v=wm5gMKuwSYk',
    videoTitle: 'Next.js 14 Complete Tutorial - App Router & Server Components',
    channel: 'Next.js Hub',
    duration: '3h 45m',
    totalLessons: 22,
    completedLessons: 1,
    status: 'in-progress',
    progress: 5,
    tags: ['Next.js', 'React', 'Server Components', 'Full Stack'],
    createdAt: new Date('2024-01-25'),
    lastAccessed: new Date('2024-01-25'),
    difficulty: 'intermediate',
  },
]

export const courseData = {
  course_title: 'Master Python Data Structures: Lists, Dictionaries, and Sets',
  course_description:
    "A comprehensive interactive course covering Python's core data structures. Learn through hands-on coding exercises, quizzes, and real-world examples. Perfect for beginners looking to solidify their Python fundamentals and intermediate developers wanting to master data structure manipulation.",
  thumbnail: 'https://content.cdn.com/jlkahsfurt2',
  original_video_url: 'https://www.youtube.com/watch/FKDoeajL3',
  estimated_duration: '3.5 hours',
  prerequisites: [
    'Basic Python syntax',
    'Understanding of variables and functions',
    'Familiarity with Python operators',
  ],
  sections: [
    {
      title: 'Introduction to Python Data Structures',
      start_time: '00:00',
      end_time: '08:30',
      content_summary:
        "Overview of Python's built-in data structures including lists, tuples, dictionaries, and sets. Explains when to use each type and their key characteristics. Covers mutability vs immutability concepts with practical examples.",
      interactivity: {
        quizzes: [
          {
            question: 'Which of the following Python data structures is mutable?',
            options: ['tuple', 'string', 'list', 'frozenset'],
            correct_answer: 'list',
            explanation:
              'Lists are mutable in Python, meaning you can change their contents after creation. Tuples, strings, and frozensets are immutable.',
          },
          {
            question:
              'What is the main advantage of using a set over a list for storing unique items?',
            options: [
              'Sets maintain insertion order',
              'Sets automatically remove duplicates',
              'Sets can store any data type',
              'Sets use less memory',
            ],
            correct_answer: 'Sets automatically remove duplicates',
            explanation:
              'Sets automatically handle uniqueness, making them ideal when you need to ensure no duplicate values exist in your collection.',
          },
        ],
        exercises: [
          {
            prompt: 'Create a list containing the numbers 1, 2, 3, 4, 5 and print its length.',
            code_stub: '# Create your list here\nmy_list = \n\n# Print the length\nprint()',
            expected_output: '5',
            tests: ['assert len(my_list) == 5', 'assert my_list == [1, 2, 3, 4, 5]'],
          },
        ],
      },
    },
    {
      title: 'Working with Lists - Creation and Basic Operations',
      start_time: '08:30',
      end_time: '22:15',
      content_summary:
        'Deep dive into Python lists including creation methods, indexing, slicing, and basic operations. Covers append, insert, remove, pop methods with practical examples. Demonstrates list comprehensions for efficient list creation and manipulation.',
      interactivity: {
        quizzes: [
          {
            question: 'What does the expression my_list[-1] return?',
            options: [
              'The first element',
              'The last element',
              'An error',
              'The second to last element',
            ],
            correct_answer: 'The last element',
            explanation:
              'Negative indexing in Python starts from the end of the list. -1 refers to the last element, -2 to the second-to-last, and so on.',
          },
          {
            question: 'Which method would you use to add multiple elements to the end of a list?',
            options: ['append()', 'insert()', 'extend()', 'add()'],
            correct_answer: 'extend()',
            explanation:
              'extend() adds all elements from an iterable to the end of the list, while append() adds only one element (which could be another list as a single element).',
          },
        ],
        exercises: [
          {
            prompt:
              "Create a list of fruits and add 'banana' to the beginning and 'grape' to the end.",
            code_stub:
              "fruits = ['apple', 'orange', 'cherry']\n\n# Add banana to the beginning\n\n# Add grape to the end\n\nprint(fruits)",
            expected_output: "['banana', 'apple', 'orange', 'cherry', 'grape']",
            tests: [
              "assert fruits[0] == 'banana'",
              "assert fruits[-1] == 'grape'",
              'assert len(fruits) == 5',
            ],
          },
          {
            prompt: 'Use list comprehension to create a list of squares from 1 to 10.',
            code_stub:
              '# Create list of squares using list comprehension\nsquares = \n\nprint(squares)',
            expected_output: '[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]',
            tests: ['assert squares == [i**2 for i in range(1, 11)]', 'assert len(squares) == 10'],
          },
        ],
      },
    },
    {
      title: 'Dictionary Fundamentals and Operations',
      start_time: '22:15',
      end_time: '38:45',
      content_summary:
        'Complete guide to Python dictionaries including creation, accessing values, adding/updating/deleting key-value pairs. Covers dictionary methods like keys(), values(), items(), get(), and pop(). Explains dictionary comprehensions and nested dictionaries with real-world examples.',
      interactivity: {
        quizzes: [
          {
            question:
              "What happens when you try to access a dictionary key that doesn't exist using dict[key]?",
            options: [
              'Returns None',
              'Returns an empty string',
              'Raises a KeyError',
              'Creates the key with None value',
            ],
            correct_answer: 'Raises a KeyError',
            explanation:
              'Accessing a non-existent key with square brackets raises a KeyError. Use the get() method to avoid this error.',
          },
          {
            question: 'Which method returns all key-value pairs as tuples?',
            options: ['keys()', 'values()', 'items()', 'pairs()'],
            correct_answer: 'items()',
            explanation:
              'The items() method returns a view object containing key-value pairs as tuples, useful for iterating over both keys and values.',
          },
        ],
        exercises: [
          {
            prompt:
              "Create a dictionary representing a student with name, age, and grade, then print the student's name.",
            code_stub:
              "# Create student dictionary\nstudent = \n\n# Print the student's name\nprint()",
            expected_output: 'Alice',
            tests: [
              "assert 'name' in student",
              "assert 'age' in student",
              "assert 'grade' in student",
              "assert student['name'] == 'Alice'",
            ],
          },
          {
            prompt:
              "Update the student's grade to 'A+' and add a new field 'subject' with value 'Math'.",
            code_stub:
              "student = {'name': 'Alice', 'age': 20, 'grade': 'B+'}\n\n# Update grade to A+\n\n# Add subject field\n\nprint(student)",
            expected_output: "{'name': 'Alice', 'age': 20, 'grade': 'A+', 'subject': 'Math'}",
            tests: ["assert student['grade'] == 'A+'", "assert student['subject'] == 'Math'"],
          },
        ],
      },
    },
    {
      title: 'Sets and Set Operations',
      start_time: '38:45',
      end_time: '52:20',
      content_summary:
        'Introduction to Python sets for storing unique elements. Covers set creation, adding/removing elements, and mathematical set operations like union, intersection, and difference. Demonstrates practical use cases including removing duplicates and membership testing.',
      interactivity: {
        quizzes: [
          {
            question: 'Which operation finds common elements between two sets?',
            options: ['union', 'intersection', 'difference', 'symmetric_difference'],
            correct_answer: 'intersection',
            explanation:
              'Intersection (& operator or intersection() method) returns elements that are present in both sets.',
          },
          {
            question:
              'What is the most efficient way to test if an element exists in a large collection?',
            options: [
              "Use a list with 'in' operator",
              "Use a dictionary with 'in' operator",
              "Use a set with 'in' operator",
              'Loop through all elements',
            ],
            correct_answer: "Use a set with 'in' operator",
            explanation:
              'Sets use hash tables for O(1) average-case lookup time, making membership testing very efficient for large collections.',
          },
        ],
        exercises: [
          {
            prompt: 'Create two sets and find their intersection (common elements).',
            code_stub:
              'set1 = {1, 2, 3, 4, 5}\nset2 = {4, 5, 6, 7, 8}\n\n# Find intersection\ncommon = \n\nprint(common)',
            expected_output: '{4, 5}',
            tests: ['assert common == {4, 5}', 'assert isinstance(common, set)'],
          },
          {
            prompt:
              'Remove duplicates from a list using a set, then convert back to a sorted list.',
            code_stub:
              'numbers = [1, 2, 2, 3, 4, 4, 5, 1, 3]\n\n# Remove duplicates and sort\nunique_sorted = \n\nprint(unique_sorted)',
            expected_output: '[1, 2, 3, 4, 5]',
            tests: [
              'assert unique_sorted == [1, 2, 3, 4, 5]',
              'assert isinstance(unique_sorted, list)',
            ],
          },
        ],
      },
    },
    {
      title: 'Advanced Data Structure Techniques',
      start_time: '52:20',
      end_time: '68:10',
      content_summary:
        'Advanced techniques for working with Python data structures including nested structures, data structure conversions, and performance considerations. Covers combining different data types effectively and choosing the right structure for specific use cases.',
      interactivity: {
        quizzes: [
          {
            question:
              'Which data structure would be best for implementing a phone book (name -> phone number mapping)?',
            options: ['list', 'tuple', 'dictionary', 'set'],
            correct_answer: 'dictionary',
            explanation:
              'Dictionaries provide key-value mapping which is perfect for associating names with phone numbers, with efficient O(1) lookup.',
          },
          {
            question:
              'What is the time complexity of checking if an element exists in a Python set?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correct_answer: 'O(1)',
            explanation:
              'Sets in Python use hash tables, providing O(1) average-case time complexity for membership testing.',
          },
        ],
        exercises: [
          {
            prompt:
              'Create a nested dictionary representing a class roster with student info, then print all student names.',
            code_stub:
              "# Create nested dictionary\nclass_roster = {\n    'student1': {'name': 'Alice', 'grade': 'A'},\n    'student2': {'name': 'Bob', 'grade': 'B'},\n    'student3': {'name': 'Charlie', 'grade': 'A-'}\n}\n\n# Print all student names\nfor student_id, info in class_roster.items():\n    print()",
            expected_output: 'Alice\nBob\nCharlie',
            tests: [
              'assert len(class_roster) == 3',
              "assert all('name' in info for info in class_roster.values())",
            ],
          },
          {
            prompt: 'Convert a list of tuples into a dictionary and find the maximum value.',
            code_stub:
              "data = [('apple', 5), ('banana', 3), ('cherry', 8), ('date', 2)]\n\n# Convert to dictionary\nfruit_counts = \n\n# Find maximum count\nmax_count = \n\nprint(f\"Maximum count: {max_count}\")",
            expected_output: 'Maximum count: 8',
            tests: [
              "assert fruit_counts == {'apple': 5, 'banana': 3, 'cherry': 8, 'date': 2}",
              'assert max_count == 8',
            ],
          },
        ],
      },
    },
    {
      title: 'Real-world Applications and Best Practices',
      start_time: '68:10',
      end_time: '85:00',
      content_summary:
        'Practical applications of Python data structures in real-world scenarios. Covers performance optimization tips, memory considerations, and common patterns. Includes examples from data analysis, web development, and algorithm implementation using appropriate data structures.',
      interactivity: {
        quizzes: [
          {
            question:
              'When processing large amounts of data, which approach is more memory efficient?',
            options: [
              'Creating multiple intermediate lists',
              'Using generator expressions and iterators',
              'Converting everything to dictionaries',
              'Using only global variables',
            ],
            correct_answer: 'Using generator expressions and iterators',
            explanation:
              "Generators and iterators process data lazily, loading only what's needed in memory at any given time, making them much more memory efficient.",
          },
          {
            question:
              'What is the best data structure for implementing a cache with fast lookups and updates?',
            options: ['list', 'dictionary', 'set', 'tuple'],
            correct_answer: 'dictionary',
            explanation:
              'Dictionaries provide O(1) average-case lookup and update operations, making them ideal for cache implementations.',
          },
        ],
        exercises: [
          {
            prompt: 'Implement a simple word frequency counter using a dictionary.',
            code_stub:
              'text = "python is great python is powerful python is fun"\nwords = text.split()\n\n# Count word frequencies\nword_count = {}\nfor word in words:\n    # Your code here\n    \nprint(word_count)',
            expected_output: "{'python': 3, 'is': 3, 'great': 1, 'powerful': 1, 'fun': 1}",
            tests: [
              "assert word_count['python'] == 3",
              "assert word_count['is'] == 3",
              'assert len(word_count) == 5',
            ],
          },
          {
            prompt:
              'Create a function that finds unique elements present in the first list but not in the second.',
            code_stub:
              'def unique_elements(list1, list2):\n    # Convert to sets and find difference\n    \n    return \n\n# Test the function\nresult = unique_elements([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])\nprint(sorted(result))',
            expected_output: '[1, 2]',
            tests: ['assert set(result) == {1, 2}', 'assert len(result) == 2'],
          },
        ],
      },
    },
  ],
  final_assessment: {
    type: 'comprehensive coding challenge',
    items: [
      {
        question: 'Build a contact management system using appropriate data structures',
        prompt:
          'Create a program that can store contacts (name, phone, email), add new contacts, search by name, and list all contacts. Use the most appropriate data structures.',
        requirements: [
          'Store multiple contacts with name, phone, and email',
          'Implement add_contact function',
          'Implement search_contact function',
          'Implement list_all_contacts function',
          'Handle duplicate names appropriately',
        ],
      },
      {
        question: 'Data analysis challenge',
        prompt:
          'Given sales data as a list of dictionaries, calculate total sales, find the best-selling product, and create a summary report.',
        sample_data: [
          { product: 'laptop', quantity: 5, price: 1000 },
          { product: 'mouse', quantity: 10, price: 25 },
          { product: 'keyboard', quantity: 8, price: 75 },
        ],
      },
    ],
  },
}
