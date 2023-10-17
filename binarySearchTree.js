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
    if (Array.isArray(func)) return console.log(func);
    else return;
  }
  inorder(func = [], root = this.root) {
    if (root === null) return;
    this.inorder(func, root.left);
    if (Array.isArray(func)) {
      func.push(root.data);
    } else {
      func(root);
    }
    this.inorder(func, root.right);
    if (Array.isArray(func) && root === this.root) return console.log(func);
  }

  preorder(func = [], root = this.root) {
    if (root === null) return;
    if (Array.isArray(func)) {
      func.push(root.data);
    } else {
      func(root);
    }
    this.preorder(func, root.left);
    this.preorder(func, root.right);
    if (Array.isArray(func) && root === this.root) return console.log(func);
  }

  postorder(func = [], root = this.root) {
    if (root === null) return;
    this.postorder(func, root.left);
    this.postorder(func, root.right);
    if (Array.isArray(func)) {
      func.push(root.data);
    } else {
      func(root);
    }
    if (Array.isArray(func) && root === this.root) return console.log(func);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([789, 1, 3, 33, 123, 55, 1, 2, 3, 4, 5]);
// const tree = new Tree([789]);
tree.insert(9);
tree.insert(1000);
tree.insert(800);
tree.insert(123);
tree.insert(100);
console.log(tree.find(1));
// tree.levelOrder((n) => (n.data = n.data * 2));
tree.postorder();
prettyPrint(tree.root);
