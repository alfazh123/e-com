import { Layers, Smartphone } from "@mui/icons-material";
import { Breadcrumbs, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import ProductTemplate from "~/components/productTemplate";

export default function Products() {
    const [productType, setProductType] = useState<"pulsa" | "data">("pulsa");

    const menuProps = [
        { label: <div className="flex gap-2 h-10 items-center justify-center">
            <Smartphone className="text-2xl" />
            <p className="font-semibold">Pulsa</p>
        </div>
            , value: "pulsa" },
        { label: <div className="flex gap-2 h-10 items-center justify-center">
            <Layers className="text-2xl" />
            <p>Data</p>
        </div>, value: "data" },
    ]


    return (
        <div className="flex flex-col justify-center mt-30 max-w-6xl mx-auto md:px-8 px-4">
            <Breadcrumbs aria-label="breadcrumb">
                <a href="/">
                    Home
                </a>
                <Typography sx={{ color: 'text.primary' }}>Products</Typography>
            </Breadcrumbs>

            <div>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="pulsa"
                    name="radio-buttons-group"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as "pulsa" | "data")}
                    row
                >   
                    {menuProps.map((menu) => (
                        <FormControlLabel 
                            key={menu.value}
                            value={menu.value}
                            control={<Radio sx={{display: "none"}} />} 
                            label={menu.label}
                            sx={{color: productType === menu.value ? "oklch(70.5% 0.213 47.604)" : "black", padding: "8px", borderBottom: productType === menu.value ? "2px solid oklch(70.5% 0.213 47.604)" : "2px solid transparent", transition: "all 0.3s" }}
                        />
                    ))}
                </RadioGroup>
            </div>
            <div className="">
                <ProductTemplate productType={productType} />
            </div>
        </div>
    )
}