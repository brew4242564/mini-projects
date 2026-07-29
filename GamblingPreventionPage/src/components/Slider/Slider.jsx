import { Slider, Box, Typography } from "@mui/material";
const CustomSlider = ({ value, setValue, name})=> {

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 350, my: 2 }}>
      <Typography id="freq-slider-label" gutterBottom>
        {name}: {value}
      </Typography>
      
      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={100}
        step={5}
        marks
        valueLabelDisplay="auto"
        aria-labelledby="slider-label"
        sx={{color: '#333c4d'}}
      />
    </Box>
  );
}

export default CustomSlider;
