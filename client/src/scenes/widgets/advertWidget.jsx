import { Box,Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const AdvertWidget = () => {

    const serverLink="http://localhost:8000"

    const FlexBetween = styled(Box)({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      });

      const WidgetWrapper = styled(Box)(({ theme }) => ({
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
      }));


  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${serverLink}/assets/iiitdmk.png`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;