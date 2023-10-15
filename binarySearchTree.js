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

  insert(value, root = this.root) {
    if (root === null) return (this.root = new Node(value));

    if (value === root.data)
      return console.log(
        `${value} is already in the tree, so was not inserted.`
      );

    if (value < root.data) {
      if (root.left === null) return (root.left = new Node(value));
      this.insert(value, root.left);
    } else if (value > root.data) {
      if (root.right === null) return (root.right = new Node(value));
      this.insert(value, root.right);
    }
  }

  delete(value, root = this.root) {
    if (value === root.data) {
      if (root.left === null && root.right === null) {
        return (this.root = null);
      }
    } else if (value < root.data) {
      if (root.left === null)
        return console.log(
          `${value} does not exist in the tree, so can't be deleted.`
        );
      if (value === root.left.data) return (root.left = null);
      this.delete(value, root.left);
    } else if (value > root.data) {
      if (root.right === null)
        return console.log(
          `${value} does not exist in the tree, so can't be deleted.`
        );
      if (value === root.right.data) return (root.right = null);
      this.delete(value, root.right);
    }
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
prettyPrint(tree.root);
