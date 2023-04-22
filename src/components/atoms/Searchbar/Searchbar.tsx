import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useData } from "../../../contexts/DataContext";
import Node from "../../../models/Node/Node";

export default function Searchbar() {
  const { setFilteredNodes, nodes } = useData();
  const filterNodes = (targetNodes: Node[], searchValue: string) => {
    const tempNodes: Node[] = [];
    targetNodes.forEach((node: Node) => {
      if (node.label.match("^" + searchValue + ".*")) {
        tempNodes.push(node);
      } else {
        const tempSubNodes = filterNodes(node.subnodes, searchValue);
        if (tempSubNodes.length > 0) {
          tempNodes.push(node);
        }
      }
    });
    return tempNodes;
  };

  const handleChange = (value: string) => {
    setFilteredNodes(filterNodes(nodes, value));
  };

  return (
    <TextField
      id="search"
      type="search"
      label="Search"
      onChange={(event) => handleChange(event.target.value)}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
