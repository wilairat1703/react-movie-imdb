import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CollectionsIcon from "@mui/icons-material/Collections";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import movies from "../assets/movie.json";

const StyledSpan = styled("span")({
  color: "#4F88D0",
  mr: 2,
  display: "inline-block",
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
});

const StyledLink = styled(Link)({
  color: "#4F88D0",
  mr: 2,
  display: "inline-block",
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
});

function MoviePage() {
  const navigate = useNavigate();
  const { mname } = useParams();
  let name = mname;
  let image = "";
  let rating = "";
  let youtubeId: string | undefined = "";
  let popularity = "";
  let human = "";
  let details = "";
  let directors:string[];
  let writers:string[];
  let stars:string[];

  function navigateTo() {
    navigate(-1);
  }

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].name == mname) {
      name = movies[i].name;
      image = movies[i].image;
      rating = movies[i].rating;
      youtubeId = movies[i].video;
      popularity = movies[i].popularity;
      human = movies[i].human;
      details = movies[i].detail;
      directors = movies[i].director;
      writers = movies[i].writers;
      stars = movies[i].stars;

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
                    {name}
                  </h1>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={1.25} sx={{ ml: 0.9, textAlign: "center" }}>
                  <span className="imdb-rating">IMDb RATING</span>
                  <Grid
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "#303030" },
                      fontSize: "1.17em",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0px 0.5rem",
                      minHeight: "2.25rem",
                      borderRadius: "5px",
                    }}
                  >
                    <Grid container sx={{ justifyContent: "space-around" }}>
                      <Grid item md={4}>
                        <StarIcon sx={{ color: "#FCCA18", fontSize: "30px" }} />
                      </Grid>
                      <Grid item md={8}>
                        <Grid
                          container
                          sx={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Grid item xs={12}>
                            {rating}{" "}
                            <span style={{ color: "#BBBBBB" }}>/10</span>
                          </Grid>
                          <Grid item xs={12}>
                            <span
                              style={{ color: "#BBBBBB", fontSize: "12px" }}
                            >
                              {human}
                            </span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={1.25} sx={{ ml: 1, textAlign: "center" }}>
                  <span className="imdb-rating">YOUR RATING</span>
                  <Grid
                    sx={{
                      color: "#599EF2",
                      "&:hover": { backgroundColor: "#303030" },
                      fontSize: "1.17em",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0px 0.5rem",
                      minHeight: "2.25rem",
                      borderRadius: "5px",
                    }}
                  >
                    <StarBorderIcon sx={{ fontWeight: "bold", mr: 1 }} />
                    Rate
                  </Grid>
                </Grid>
                <Grid item md={1.25} sx={{ ml: 1, textAlign: "center" }}>
                  <span className="imdb-rating">POPULARITY</span>
                  <Grid
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "#303030" },
                      fontSize: "1.17em",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0px 0.5rem",
                      minHeight: "2.25rem",
                      borderRadius: "5px",
                    }}
                  >
                    <ArrowCircleRightIcon
                      sx={{ fontSize: "24px", color: "#fff", mr: 1 }}
                    />
                    {popularity}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={3}>
                  <img src={image} alt="" width={273.68} height={393.68} />
                </Grid>
                <Grid item md={7}>
                  {youtubeId ? (
                    <iframe
                      width="645.2"
                      height="393.68"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
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
                  {details}
                  <hr style={{ border: "1px solid #555150" }} />
                  <Grid container>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          Director
                        </Typography>
                        {directors!.map((dir, index) => {
                          return (
                            <>
                              <StyledLink to={`/person?name=${dir}`}> {dir}</StyledLink>
                              {directors.length - 1 != index ? (
                                <Box marginRight={1} marginLeft={1} sx={{transform:'none'}}>
                                  ·
                                </Box>
                              ) : null}
                            </>
                          );
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                  <hr style={{ border: "1px solid #555150" }} />
                  <Grid container>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          Writer
                        </Typography>
                        {writers!.map((wri, index) => {
                          return (
                            <>
                              <StyledLink to={`/person?name=${wri}`}>{wri}</StyledLink>
                              {writers.length - 1 != index ? (
                                <Box marginRight={1} marginLeft={1} sx={{transform:'none'}}>
                                  ·
                                </Box>
                              ) : null}
                            </>
                          );
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                  <hr style={{ border: "1px solid #555150" }} />
                  <Grid container>
                  <Grid item xs={12}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          Star
                        </Typography>
                        {stars!.map((sta, index) => {
                          return (
                            <>
                              <StyledLink to={`/person?name=${sta}`}>{sta}</StyledLink>
                              {stars.length - 1 != index ? (
                                <Box marginRight={1} marginLeft={1} sx={{transform:'none'}}>
                                  ·
                                </Box>
                              ) : null}
                            </>
                          );
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                  <hr style={{ border: "1px solid #555150" }} />
                </Grid>
                <Grid item md={0.5}></Grid>
                <Grid item md={3.5} mt={5}>
                  <Grid container>
                    <Grid
                      item
                      md={10.2}
                      sx={{
                        backgroundColor: "#F5C518",
                        paddingBlock: "1px",
                        paddingInline: "1px",
                        borderRadius: "5px 0px 0px 5px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#E2B617",
                        },
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
                            color: "black",
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
                                <Box>Add to Watchlish</Box>
                              </Grid>
                              <Grid item xs={12} sx={{ fontSize: "12px" }}>
                                <Box>Added by 1.3M users</Box>
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
                  <Grid container sx={{ mt: 2.5 }}>
                    <Grid item md={5}>
                      <StyledSpan>
                        <span style={{ fontWeight: "bold" }}>5.5K </span>User
                        reviews
                      </StyledSpan>
                    </Grid>
                    <Grid item md={5}>
                      <StyledSpan>
                        <span style={{ fontWeight: "bold" }}>210 </span>Critic
                        reviews
                      </StyledSpan>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 2.5 }}>
                    <Grid item md={1.5}>
                      <Box
                        sx={{
                          backgroundColor: "#54A72A",
                          fontWeight: "bold",
                          width: "30px",
                        }}
                      >
                        100
                      </Box>
                    </Grid>
                    <Grid item>
                      <StyledSpan>Metascore</StyledSpan>
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
export default MoviePage;
