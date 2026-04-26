import React from "react";
import { useSnackbar } from "notistack";

export const useNotifier = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Variant-specific config
    const variantConfig = {
        success: { autoHideDuration: 3000, },
        error: { autoHideDuration: 6000 },
        warning: { autoHideDuration: 4000 },
        info: { autoHideDuration: 5000 },
        default: { autoHideDuration: 3000 }
    };

    const closeAction = (key) => (
        React.createElement(
            "button",
            {
                style: {
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginLeft: "8px"
                },
                onClick: () => closeSnackbar(key)
            },
            "✖"
        ));

    const notificationMsg = (variant, message) => {
        if (!message) return;
        const options = variantConfig[variant] || variantConfig.default;

        enqueueSnackbar(message, {
            variant,
            ...options,
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            preventDuplicate: true,
            action: closeAction,
            
        });
    };

    return { notificationMsg };
};
