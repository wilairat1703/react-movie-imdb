import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import movies from "../../assets/movie.json";
import person from "../../assets/persons.json";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  createSvgIcon,
} from "@mui/material";
import { Link } from "react-router-dom";

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);
function HomePage() {
  return (
    <>
      <Box sx={{ bgcolor: "#121212" }}>
        <Container fixed sx={{ mt: 4 }}>
          <Grid container>
            <Grid
              item
              md={0.05}
              sx={{ backgroundColor: "#FCCA18", height: 30, mt: 3 }}
            ></Grid>
            <Grid item md={5} sx={{ ml: 2 }}>
              <h2>Top 10 on IMDb this week</h2>
            </Grid>
          </Grid>
          <Grid container sx={{ display: "flex" }}>
            {movies.map((story, i) => {
              return (
                <Grid item md={2} key={story.id}>
                  <Link to={`/movie/${story.name}`}>
                    <Card
                      sx={{
                        maxWidth: 180,
                        backgroundColor: "#1A1A1A",
                        color: "white",
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        width="180"
                        image={story.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Grid container>
                          <Grid sx={{ mt: 0.2 }}>
                            <StarIcon sx={{ color: "#FCCA18" }} />
                          </Grid>
                          <Grid sx={{ mt: 0.2 }}>{story.rating}</Grid>
                          <Grid>
                            <Button
                              sx={{
                                ml: 2,
                                width: "10px",
                                height: "10px",
                                color: "#599EF2",
                                "&:hover": { color: "white" },
                              }}
                            >
                              <StarBorderIcon />
                            </Button>
                          </Grid>
                        </Grid>

                        <Typography
                          gutterBottom
                          sx={{
                            fontSize: 16,
                            mt: 1,
                            color: "white",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {i + 1} . {story.name}
                        </Typography>
                        <Grid container sx={{ textAlign: "center" }}>
                          <Grid item md={12}>
                            <Button
                              sx={{
                                backgroundColor: "#2C2C2C",
                                fontSize: 14,
                                fontWeight: "bold",
                                width: "100%",
                                padding: "0 1rem",
                                justifyContent: "center",
                                minHeight: "2.25rem",
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#30353C" },
                              }}
                            >
                              <PlusIcon
                                style={{ fontSize: 20, fontWeight: "bold" }}
                              />{" "}
                              Watchlist
                            </Button>
                            <Button
                              sx={{
                                textTransform: "none",
                                mt: 2,
                                fontSize: 14,
                                fontWeight: "bold",
                                width: "60%",
                                boxSizing: "border-box",
                                color: "white",
                                "&:hover": { backgroundColor: "#2C2C2C" },
                              }}
                            >
                              <PlayArrowIcon />
                              Trailer
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Grid container sx={{ height: "45px" }}>
              <Grid
                item
                xs={0.05}
                sx={{ backgroundColor: "#FCCA18", height: 30, mt: 3 }}
              ></Grid>
              <Grid item xs={11} sx={{ ml: 2 }}>
                <h2>Born today</h2>
              </Grid>
            </Grid>
            <p style={{ color: "#AEAEAE" }}>People born on February 11</p>

            <Grid container sx={{ display: "flex" }}>
              {person.slice(0, 6).map((people) => {
                return (
                  <Grid item md={2} key={people.id}>
                    <Link to={`/person?name=${people.name}`}>
                      <Card
                        sx={{
                          maxWidth: "95%",
                          backgroundColor: "#121212",
                          color: "white",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            sx={{
                              paddingTop: "81.25%",
                              minHeight: "3vh",
                              minWidth: "180px",
                              position: "relative",
                              borderRadius: "50%",
                            }}
                            image={people.image}
                            title="green iguana"
                          />
                          <CardContent sx={{ textAlign: "center" }}>
                            <Typography
                              gutterBottom
                              component="div"
                              sx={{ height: 10 }}
                            >
                              {people.name}
                            </Typography>
                            <p style={{ color: "#AEAEAE" }}>{people.age}</p>
                            <Grid container sx={{ width: "100" }}>
                              <Grid></Grid>
                            </Grid>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
              */
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default HomePage;
