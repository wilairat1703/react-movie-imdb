import { AppBar, Box } from "@mui/material";

function navbarPage() {
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
          <Box sx={{ fontSize: 20, ml: 5, color: "#FCCA18" }}>
            <h3>IMDB</h3>
          </Box>
        </AppBar>
      </Box>
    </>
  );
}
export default navbarPage;
