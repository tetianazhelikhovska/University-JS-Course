const SortingLibrary = (() => {
  function logStats(name, comparisons, moves, hasUndefined) {
    console.log(`\n--- ${name} ---`);
    console.log(`Порівнянь: ${comparisons}`);
    console.log(`Переміщень/обмінів: ${moves}`);
    if (hasUndefined) {
      console.warn("У масиві присутні елементи undefined (розріджений масив). Вони були пропущені.");
    }
  }

  function createComparator(ascending) {
    return ascending
      ? (a, b) => a > b
      : (a, b) => a < b;
  }

  function filterSparseArray(arr) {
    const hasUndefined = arr.some(v => v === undefined);
    return {
      cleanArray: arr.filter(v => v !== undefined),
      hasUndefined
    };
  }

  function bubbleSort(array, ascending = true) {
    const { cleanArray, hasUndefined } = filterSparseArray(array);
    let arr = [...cleanArray];
    let compare = createComparator(ascending);
    let comparisons = 0, moves = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comparisons++;
        if (compare(arr[j], arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          moves++;
        }
      }
    }

    logStats("Сортування обміну (bubble sort)", comparisons, moves, hasUndefined);
    return arr;
  }

  function selectionSort(array, ascending = true) {
    const { cleanArray, hasUndefined } = filterSparseArray(array);
    let arr = [...cleanArray];
    let compare = createComparator(ascending);
    let comparisons = 0, moves = 0;

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        if (compare(arr[minIdx], arr[j])) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        moves++;
      }
    }

    logStats("Сортування мінімальних елементів (selection sort)", comparisons, moves, hasUndefined);
    return arr;
  }

  function insertionSort(array, ascending = true) {
    const { cleanArray, hasUndefined } = filterSparseArray(array);
    let arr = [...cleanArray];
    let compare = createComparator(ascending);
    let comparisons = 0, moves = 0;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && compare(arr[j], key)) {
        comparisons++;
        arr[j + 1] = arr[j];
        j--;
        moves++;
      }
      comparisons++;
      arr[j + 1] = key;
    }

    logStats("Сортування вставками (insertion sort)", comparisons, moves, hasUndefined);
    return arr;
  }

  function shellSort(array, ascending = true) {
    const { cleanArray, hasUndefined } = filterSparseArray(array);
    let arr = [...cleanArray];
    let compare = createComparator(ascending);
    let comparisons = 0, moves = 0;

    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i];
        let j;
        for (j = i; j >= gap && compare(arr[j - gap], temp); j -= gap) {
          comparisons++;
          arr[j] = arr[j - gap];
          moves++;
        }
        comparisons++;
        arr[j] = temp;
      }
    }

    logStats("Сортування Шелла (shell sort)", comparisons, moves, hasUndefined);
    return arr;
  }

  function quickSort(array, ascending = true) {
    const { cleanArray, hasUndefined } = filterSparseArray(array);
    let arr = [...cleanArray];
    let comparisons = 0, moves = 0;
    const compare = createComparator(ascending);

    function partition(items, left, right) {
      const pivot = items[Math.floor((left + right) / 2)];
      let i = left;
      let j = right;

      while (i <= j) {
        while (compare(pivot, items[i])) {
          i++;
          comparisons++;
        }
        comparisons++;
        while (compare(items[j], pivot)) {
          j--;
          comparisons++;
        }
        comparisons++;
        if (i <= j) {
          [items[i], items[j]] = [items[j], items[i]];
          moves++;
          i++;
          j--;
        }
      }
      return i;
    }

    function quickSortRecursive(items, left, right) {
      if (items.length > 1) {
        const index = partition(items, left, right);
        if (left < index - 1) {
          quickSortRecursive(items, left, index - 1);
        }
        if (index < right) {
          quickSortRecursive(items, index, right);
        }
      }
    }

    quickSortRecursive(arr, 0, arr.length - 1);
    logStats("Швидке сортування (quick sort)", comparisons, moves, hasUndefined);
    return arr;
  }

  return {
    bubbleSort,
    selectionSort,
    insertionSort,
    shellSort,
    quickSort
  };
})();
