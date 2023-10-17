class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = array
      .sort((a, b) => a - b)
      .filter((item, index) => array.indexOf(item) === index);
    this.root = this.buildTree(sortedArray);
    console.log("New tree created.");
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.round((array.length - 1) / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid + 1);
    const rootNode = new Node(
      array[mid],
      this.buildTree(left),
      this.buildTree(right)
    );
    return rootNode;
  }

  find(value, root = this.root) {
    if (root === null) {
      return `${value} does not exist in the tree.`;
    }
    if (value === root.data) {
      return root;
    } else if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }
  }

  insert(value, root = this.root) {
    if (root === null) {
      this.root = new Node(value);
      return;
    }

    if (value === root.data) {
      console.log(`${value} is already in the tree, so was not inserted.`);
      return;
    }

    if (value < root.data) {
      if (root.left === null) {
        root.left = new Node(value);
        return;
      }
      this.insert(value, root.left);
    } else if (value > root.data) {
      if (root.right === null) {
        root.right = new Node(value);
        return;
      }
      this.insert(value, root.right);
    }
  }

  delete(value, root = this.root) {
    // Can't find value in tree
    if (root === null) {
      console.log(
        `${value} could not be found in the tree, so could not be deleted.`
      );
      return null;
    }
    // Searching for value
    else if (value < root.data) {
      root.left = this.delete(value, root.left);
      return root;
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
      return root;
    }
    // value found
    else if (value === root.data) {
      // no children delete
      if (root.left === null && root.right === null) {
        return null;
      }
      // one child delete
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      // two child delete
      if (root.left && root.right) {
        let largestLeft = this.findLargestNode(root.left);
        root.data = largestLeft.data;
        root.left = this.delete(largestLeft.data, root.left);
        return root;
      }
    }
  }

  findLargestNode(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }

  levelOrder(func = [], root = this.root) {
    if (root === null) return;
    let queue = [root];
    while (queue.length > 0) {
      let currentNode = queue[0];
      if (Array.isArray(func)) {
        func.push(currentNode.data);
      } else {
        func(currentNode);
      }
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      queue.shift();
    }
    if (Array.isArray(func)) return console.log(`Level order -> ${func}`);
    else return;
  }

  inorderRecursion(func = [], root = this.root) {
    if (root === null) return;
    this.inorderRecursion(func, root.left);
    if (Array.isArray(func)) {
      func.push(root.data);
    } else {
      func(root);
    }
    this.inorderRecursion(func, root.right);
    if (Array.isArray(func) && root === this.root) return func;
  }

  inorder(func = [], root = this.root) {
    let result = this.inorderRecursion(func, root);
    if (Array.isArray(result)) console.log(`In order -> ${result}`);
  }

  preorderRecursion(func = [], root = this.root) {
    if (root === null) return;
    if (Array.isArray(func)) {
      func.push(root.data);
    } else {
      func(root);
    }
    this.preorderRecursion(func, root.left);
    this.preorderRecursion(func, root.right);
    if (Array.isArray(func) && root === this.root) return func;
  }

  preorder(func = [], root = this.root) {
    let result = this.preorderRecursion(func, root);
    if (Array.isArray(result)) console.log(`Pre order -> ${result}`);
  }

  postorderRecursion(func = [], root = this.root) {
    if (root === null) return;
    this.postorderRecursion(func, root.left);
    this.postorderRecursion(func, root.right);
    if (Array.isArray(func)) {
      func.push(root.data);
    } else {
      func(root);
    }
    if (Array.isArray(func) && root === this.root) return func;
  }

  postorder(func = [], root = this.root) {
    let result = this.postorderRecursion(func, root);
    if (Array.isArray(result)) console.log(`Post order -> ${result}`);
  }

  height(root = this.root) {
    if (root === null) return -1;
    else {
      let leftHeight = this.height(root.left);
      let rightHeight = this.height(root.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(node, root = this.root) {
    if (root == null) return -1;
    var dist = -1;
    if (
      root == node ||
      (dist = this.depth(node, root.left)) >= 0 ||
      (dist = this.depth(node, root.right)) >= 0
    )
      return dist + 1;

    return dist;
  }

  isBalancedRecursion(root) {
    if (root === null) return 0;
    let leftSubTreeHeight = this.height(root.left);
    if (leftSubTreeHeight === -1) return -1;
    let rightSubTreeHeight = this.height(root.right);
    if (rightSubTreeHeight === -1) return -1;

    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1) return -1;

    return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
  }

  isBalanced(root = this.root) {
    if (this.isBalancedRecursion(root) === -1) {
      console.log(
        `The tree starting at root node with value ${root.data} is not balanced.`
      );
    } else {
      console.log(
        `The tree starting at root node with value ${root.data} is balanced.`
      );
    }
  }

  rebalance() {
    const array = this.inorderRecursion();
    const newRoot = this.buildTree(array);
    this.root = newRoot;
    console.log("Tree rebalanced.");
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

function driverScript() {
  function randomArray() {
    let randomArray = [];
    for (let i = 0; i < Math.max(10, Math.floor(Math.random() * 100)); i++) {
      const randomNumber = Math.floor(Math.random() * 100);
      randomArray.push(randomNumber);
    }
    return randomArray;
  }

  function insertRandomNumbers() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = 100 + Math.floor(Math.random() * 100);
      tree.insert(randomNumber);
      array.push(randomNumber);
    }
    console.log(`The following numbers inserted -> ${array}`);
  }

  const tree = new Tree(randomArray());
  tree.prettyPrint();
  tree.isBalanced();
  tree.levelOrder();
  tree.inorder();
  tree.preorder();
  tree.postorder();
  insertRandomNumbers();
  tree.prettyPrint();
  tree.isBalanced();
  tree.rebalance();
  tree.prettyPrint();
  tree.isBalanced();
  tree.levelOrder();
  tree.inorder();
  tree.preorder();
  tree.postorder();
}

driverScript();
