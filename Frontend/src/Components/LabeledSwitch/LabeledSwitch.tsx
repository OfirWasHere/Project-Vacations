import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

interface LabeledSwitchProps {
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function LabeledSwitch({ label, onChange }: LabeledSwitchProps) {
    return (
        <FormGroup>
            <FormControlLabel control={<Switch onChange={onChange}/>} label={label}/>
        </FormGroup>
    );
}