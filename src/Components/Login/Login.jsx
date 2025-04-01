import { useForm, Controller } from "react-hook-form";
import { Flex, Typography, Card, Input, Button, Checkbox, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { obtenerUsuarioPorEmail } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { Title, Link } = Typography;
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
  });

  const email = watch("email"); // Observa cambios en el email
  const password = watch("password"); // Observa cambios en la contraseña

  useEffect(() => {
    if (errors.credentials) {
      clearErrors("credentials"); // Borra el error cuando hay cambios
    }
  }, [email, password]);

  const onSubmit = async (data) => {
    try {
      const usuario = await obtenerUsuarioPorEmail(data.email); // Buscar el usuario por email
      // Verificar si el usuario existe y la contraseña coincide¿
      if (!usuario || usuario.password !== data.password) {
        setError("credentials", {
          message: "El usuario o la contraseña no son válidos",
        });
        return;
      }

      console.log("Inicio de sesión exitoso:", usuario);
      navigate("/");
      // Aquí puedes manejar la navegación o el estado del usuario
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle">
            <Title>Login</Title>
            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="E-mail"
                  prefix={<UserOutlined />}
                />
              )}
            />
            {/* Contraseña */}
            <Controller
              name="password"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                />
              )}
            />
            {errors.credentials && (
              <span style={{ color: "red" }}>{errors.credentials.message}</span>
            )}{" "}
            {/* Mostrar mensaje único */}
            {/* Recordar sesión y enlace de recuperación */}
            <Flex justify="space-between">
              <Controller
                name="rememberPassword"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value}>
                    Recordar sesión
                  </Checkbox>
                )}
              />
              <Link href="/sing-up" target="_blank">
                ¿Olvidaste tu contraseña?
              </Link>
            </Flex>
            <Flex justify="center">
              <Button type="primary" htmlType="submit">
                Iniciar Sesión
              </Button>
            </Flex>
          </Space>
        </form>
      </Card>
    </Flex>
  );
}
