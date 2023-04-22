import FileTree from "../../molecules/FileTree/FileTree";
import FileTreeMenu from "../../molecules/FileTreeMenu/FileTreeMenu";

export default function FileNavigation() {
  return (
    <div >
      <FileTreeMenu />
      <FileTree />
    </div>
  );
}
