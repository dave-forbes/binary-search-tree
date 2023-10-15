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
    console.log(sortedArray);
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
  // insert(value) {
  //   console.log(this.root);
  // }
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
prettyPrint(tree.root);
// tree.insert();
