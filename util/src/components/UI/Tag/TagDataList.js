import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Fragment } from "react";
import { IconButton, createTheme, ThemeProvider } from "@mui/material";

const TagList = styled("li")(({ theme }) => ({
  margin: theme.spacing(0, 0.5, 0, 0),
  listStyle: 'none'
}));


const chipTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: { 
          marginRight: 4,
          border: '1px solid rgba(0,0,0,0.05);',
          boxSizing: 'border-box'
         },
      },
    },
  },
});


const TagDataList = (props) => {
  const TagDataItem = [];

  const maxIndex = (list) => {
    if (list) {
      return list.length < 5 ? list.length : 5;
    } else {
      return 0;
    }
  };

  const bgColorList = ["#f9f5fc", "#f5f5fc", "#fcf5eb", "#f5fceb", "#fcfceb"];
  const colorList = ["#381E72", "#013ab1", "#622100", "#1c663c", "#754502"];

  for (var i = 0; i < maxIndex(props.tagList); i++) {
    TagDataItem.push(
      <TagList key={i}>
        <ThemeProvider theme={chipTheme}>
        <Chip
          variant="outlined"
          label={props.tagList[i].tagName}
          onClick={props.onClick}
          size="medium"
          sx={{
            // outline: 'rgb(255,0,0)',
            bgcolor: bgColorList[i],
            color: colorList[i],
            "& .MuiButtonBase-root": {
              borderRadius: '1px'
            }
          }}
          id={props.tagList[i].tagId}
        />
        </ThemeProvider>
      </TagList>
    );
  }

  return (
    <Fragment>
      <div style={{display:'flex', marginTop:'8px'}}>{TagDataItem}</div>
    </Fragment>
  );
};

export default TagDataList;
