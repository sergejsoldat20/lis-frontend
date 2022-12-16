/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { Card as CardAntd } from "antd";
// npm install @mui/icons-material
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   // transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
export default function ViewMedicalRecord() {
  // eslint-disable-next-line no-unused-vars
  const [medicalRecord, setMedicalRecord] = useState({
    icd: "",
    isValid: "",
    hematologyId: null,
    urineId: null,
    biochemistryId: null,
    patientId: null,
    userId: null,
  });
  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  // });
  const { id } = useParams();
  const loadMedicalRecord = async () => {
    const result = await axios.get(
      `http://localhost:9000/medical-records/${id}`
    );
    setMedicalRecord(result.data);
  };
  useEffect(() => {
    loadMedicalRecord();
  });
  const [expanded, setExpanded] = useState([]);

  const handleExpandClick = (broj) => {
    if (expanded.includes(broj)) {
      const expandedCopy = expanded.filter((element) => {
        return element !== broj;
      });
      setExpanded(expandedCopy);
    } else {
      const expandedCopy = [...expanded];
      expandedCopy.push(broj);
      setExpanded(expandedCopy);
    }
  };

  return (
    <List>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={{ textAlign: "left" }}>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(3,1fr)",
            }}
          >
            <ListItem variant="body2">ICD: {medicalRecord.icd}</ListItem>
            <ListItem variant="body2">
              Is Valid: {medicalRecord.isValid}
            </ListItem>
            <ListItem variant="body2">Signed: {medicalRecord.userId}</ListItem>
          </Box>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "space-evenly" }}>
          <IconButton
            onClick={() => handleExpandClick(0)}
            sx={{
              color: expanded.includes(0) ? "blue" : "black",
              fontSize: 16,
              textDecoration: expanded.includes(0) ? "underline" : "",
            }}
          >
            Biochemistry
          </IconButton>
          <IconButton
            onClick={() => handleExpandClick(1)}
            aria-label="show more"
            sx={{
              color: expanded.includes(1) ? "blue" : "black",
              fontSize: 16,
              textDecoration: expanded.includes(1) ? "underline" : "",
            }}
          >
            Hematology
          </IconButton>
          <IconButton
            onClick={() => handleExpandClick(2)}
            aria-label="show more"
            sx={{
              color: expanded.includes(2) ? "blue" : "black",
              fontSize: 16,
              textDecoration: expanded.includes(2) ? "underline" : "",
            }}
          >
            Urine
          </IconButton>
        </CardActions>
        <Collapse in={expanded.includes(0)} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Nalaz1</Typography>
          </CardContent>
        </Collapse>
        <Collapse in={expanded.includes(1)} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Nalaz2</Typography>
          </CardContent>
        </Collapse>
        <Collapse in={expanded.includes(2)} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Nalaz3</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={{ textAlign: "left" }}>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(3,1fr)",
            }}
          >
            <ListItem variant="body2">ICD: {medicalRecord.icd}</ListItem>
            <ListItem variant="body2">
              Is Valid: {medicalRecord.isValid}
            </ListItem>
            <ListItem variant="body2">Signed: {medicalRecord.userId}</ListItem>
          </Box>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "space-evenly" }}>
          <IconButton
            onClick={() => handleExpandClick(3)}
            sx={{
              color: expanded.includes(3) ? "blue" : "black",
              fontSize: 16,
              textDecoration: expanded.includes(3) ? "underline" : "",
            }}
          >
            Biochemistry
          </IconButton>
          <IconButton
            onClick={() => handleExpandClick(4)}
            aria-label="show more"
            sx={{
              color: expanded.includes(4) ? "blue" : "black",
              fontSize: 16,
              textDecoration: expanded.includes(4) ? "underline" : "",
            }}
          >
            Hematology
          </IconButton>
          <IconButton
            onClick={() => handleExpandClick(5)}
            aria-label="show more"
            sx={{
              color: expanded.includes(5) ? "blue" : "black",
              fontSize: 16,
              textDecoration: expanded.includes(5) ? "underline" : "",
            }}
          >
            Urine
          </IconButton>
        </CardActions>
        <Collapse in={expanded.includes(3)} timeout="auto" unmountOnExit>
          <CardContent>
            <CardAntd title="Card title 123321">
              <CardAntd
                type="inner"
                title="Inner Card title 111 "
                extra={<a href="#">More</a>}
              >
                Inner Card content 555
              </CardAntd>
              <CardAntd
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="Inner Card title 222"
                extra={<a href="#">More</a>}
              >
                Inner Card content 666
              </CardAntd>
            </CardAntd>
          </CardContent>
        </Collapse>
        <Collapse in={expanded.includes(4)} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Nalaz2</Typography>
          </CardContent>
        </Collapse>
        <Collapse in={expanded.includes(5)} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Nalaz3</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </List>
  );
}
