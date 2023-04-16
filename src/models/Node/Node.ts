export default interface Node {
  label: string;
  path: string;
  subnodes: Node[];
  type: "file" | "folder";
}
