import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import { TooltipProps } from "@mui/material/Tooltip";

const Tooltips = ({
                      message,
                      children,
                      placement,
                  }: {
    message: string;
    children: React.ReactNode;
    placement?: TooltipProps["placement"];
}) => {
    return (
        <Tooltip title={message} arrow placement={placement}>
            <Box sx={{ display: "inline-block" }}>
                {children}
            </Box>
        </Tooltip>
    );
};

export default Tooltips;
