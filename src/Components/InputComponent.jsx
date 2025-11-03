import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";

export default function InputPassword({ control, name, placeholder, errors }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Controller
                name={name}
                control={control}
                rules={{ required: "Este campo es obligatorio" }}
                render={({ field }) => (
                    <Input
                        {...field}
                        type={visible ? "text" : "password"}
                        placeholder={placeholder}
                        prefix={<LockOutlined />}
                        suffix={
                            visible ? (
                                <EyeInvisibleOutlined onClick={() => setVisible(false)} />
                            ) : (
                                <EyeOutlined onClick={() => setVisible(true)} />
                            )
                        }
                    />
                )}
            />
            {errors[name] && <span>{errors[name].message}</span>}
        </div>
    );
}