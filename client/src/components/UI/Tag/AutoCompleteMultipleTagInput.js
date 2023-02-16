import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const AutoCompleteMultipleTagInput = (props) => {
  return (
    <Autocomplete
      id="tags-filled"
      multiple
      freeSolo
      options={props.tagList}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            size="small"
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={props.label}
          error={props.error}
          helperText={props.helperText}
        />
      )}
      value={props.value}
      onChange={(event, value) => props.onChange(value)}
    />
  );
};

export default AutoCompleteMultipleTagInput;
