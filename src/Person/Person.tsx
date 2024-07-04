import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CollectionsIcon from "@mui/icons-material/Collections";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import person from "../assets/persons.json";

const StyledSpan = styled("span")({
    color: "#4F88D0",
    marginRight: "8px",
    display: "inline-block",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  });

  
function PersonPage() {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const pname = param.get("name");
  let image = "";
  let youtube: string | undefined = "";
  let detail: string | undefined = "";
  let birthday: string | undefined = "";
  
  function navigateTo() {
    navigate(-1);
  }

  for (let i = 0; i < person.length; i++) {
    if (person[i].name == pname) {
      image = person[i].image;
      youtube = person[i].video;
      detail = person[i].detail;
      birthday = person[i].birthday;
      break;
    }
  }

  return (
    <>
      <Box sx={{ bgcolor: "#121212" }}>
        <Container fixed sx={{ mt: 4 }}>
          <Grid container sx={{ color: "#FCCA18", height: "70px" }}>
            <Grid item md={0.1} sx={{ mt: 3 }}>
              <ArrowBackIosIcon
                sx={{ fontWeight: "bold", fontSize: "2rem", mt: 1.5 }}
              />
            </Grid>
            <Link to="/" onClick={navigateTo}>
              <Grid item md={5} sx={{ ml: 1.5 }}>
                <h2 style={{ fontSize: "32px", color: "#FCCA18" }}>Back</h2>
              </Grid>
            </Link>
          </Grid>
          <Box sx={{ bgcolor: "#1D1F1E", color: "white", mt: 1 }}>
            <Box sx={{ ml: 2, mr: 2 }}>
              <Grid container sx={{ height: "100px", display: "flex" }}>
                <Grid item md={7}>
                  <h1
                    style={{
                      fontSize: "50px",
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "300",
                      fontStyle: "normal",
                    }}
                  >
                    {pname}
                  </h1>
                </Grid>
                <Grid item md={1.5}></Grid>
                <Grid item md={1.25} sx={{ ml: 1, textAlign: "center",mt:4,fontWeight:'bold',"&:hover": { backgroundColor: "#303030" },}}>
                  {/* <span>IMDbPro</span>
                  STARMETER */}
                </Grid>
                <Grid item md={2} sx={{ ml: 1, textAlign: "center",mt:4 }}>
                  <Grid
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "#303030" },
                      fontSize: "1em",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0px 0.5rem",
                      minHeight: "2.25rem",
                      borderRadius: "5px",
                    }}
                  >
                    <ArrowCircleUpIcon
                      sx={{ fontSize: "30px", color: "red", mr: 1 }}
                    />
                    <span style={{ fontSize: "20px",fontWeight:'bold'}}>Top 500</span>
                    <ArrowDropDownIcon sx={{ fontSize: "30px", color: "red",}}/>
                    <span style={{ fontSize: "20px",fontWeight:'bold'}}>65</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={3}>
                  <img src={image} alt="" width={273.68} height={393.68} />
                </Grid>
                <Grid item md={7}>
                  {youtube ? (
                    <iframe
                      width="645.2"
                      height="393.68"
                      src={`https://www.youtube.com/embed/${youtube}`}
                      frameBorder="0"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                  ) : (
                    <p>Error: YouTube video ID not found</p>
                  )}
                </Grid>
                <Grid item md={2}>
                  <Grid container>
                    <Grid
                      item
                      md={12}
                      sx={{
                        backgroundColor: "#323232",
                        height: "192.7px",
                        "&:hover": {
                          backgroundColor: "#414141",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          flexDirection: "column",
                          padding: "70px 0",
                        }}
                      >
                        <Box>
                          <VideoLibraryIcon
                            sx={{ color: "white", height: 35, width: 35 }}
                          />
                        </Box>
                        <Box
                          sx={{
                            fontSize: "0.9em",
                            fontWeight: "bold",
                            display: "flex",
                            padding: "0px 0.5rem",
                            minHeight: "2.25rem",
                            mt: 1,
                          }}
                        >
                          13 VIDEOS
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      md={12}
                      sx={{
                        backgroundColor: "#323232",
                        height: "192.7px",
                        mt: 1,
                        "&:hover": {
                          backgroundColor: "#414141",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          flexDirection: "column",
                          padding: "70px 0",
                        }}
                      >
                        <Box>
                          <CollectionsIcon
                            sx={{ color: "white", height: 35, width: 35 }}
                          />
                        </Box>
                        <Box
                          sx={{
                            fontSize: "0.9em",
                            fontWeight: "bold",
                            display: "flex",
                            padding: "0px 0.5rem",
                            minHeight: "2.25rem",
                            mt: 1,
                          }}
                        >
                          99 + PHOTOS
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 4 }}>
                <Grid
                  item
                  md={8}
                  sx={{
                    mb: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "400",
                    letterSpacing: ".03125em",
                    lineHeight: "1.5rem",
                  }}
                >
                  {detail}
                  <hr style={{ border: "1px solid #555150" }} />
                  <Grid container sx={{"&:hover": {cursor: "pointer"}}}>
                  <Grid item md={2.5}>
                      <span style={{ fontWeight: "bold" }}>More at IMDbPro</span>
                    </Grid>
                      <Grid item sx={{mb: 0.5, display: "flex" }}>
                        <StyledSpan>Contact</StyledSpan>
                      </Grid>
                      <Grid item sx={{mb: 0.5, display: "flex" }}>
                        <StyledSpan>infoAgent</StyledSpan>
                      </Grid>
                      <Grid item sx={{mb: 0.5, display: "flex" }}>
                        <StyledSpan>infoAgent</StyledSpan>
                      </Grid>
                  </Grid>
                  <hr style={{ border: "1px solid #555150" }} />
                </Grid>
                <Grid item md={0.5}></Grid>
                <Grid item md={3.5} mt={3}>
                <Grid container>
                    <Grid item md={1}>
                      <span style={{ fontWeight: "bold" }}>Born</span>
                    </Grid>
                    <Grid sx={{ ml: 2}}>{birthday}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      md={10.2}
                      mt={2}
                      sx={{
                        height: "50px",
                        backgroundColor: "#F5C518",
                        paddingBlock: "1px",
                        paddingInline: "2px",
                        borderRadius: "5px 0px 0px 5px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#E2B617",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          md={2}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AddIcon />
                        </Grid>
                        <Grid item md={10}>
                          <Grid container>
                            <Grid
                              container
                              sx={{
                                alignItems: "flex-start",
                                color: "black",
                              }}
                            >
                              <Grid item xs={12} sx={{ fontWeight: "bold" }}>
                                <Box>Add to lish</Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={0.05}></Grid>
                    <Grid
                      item
                      md={1.75}
                      mt={2}
                      sx={{
                        backgroundColor: "#F5C518",
                        paddingBlock: "1px",
                        paddingInline: "1px",
                        borderRadius: "0px 5px 5px 0px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#E2B617",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                      }}
                    >
                      <KeyboardArrowDownIcon />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default PersonPage;
