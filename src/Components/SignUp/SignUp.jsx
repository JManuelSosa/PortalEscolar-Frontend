import { useForm, Controller } from "react-hook-form";
import { Flex, Typography, Card, Input, Button, Checkbox, Space } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { crearUsuario, obtenerUsuarioPorEmail } from "../../api"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useAuth } from "../../Context/AuthContext";

const { Title } = Typography;

export default function SignUp() {
  const { dispatch } = useAuth();


  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const usuarioExistente = await obtenerUsuarioPorEmail(data.email);

      if (usuarioExistente) {
        setError("email", { message: "El email ya está registrado" });
        return;
      }

      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          message: "Las contraseñas no coinciden",
        });
        return;
      }

      const user = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        termsAccepted: data.terms,
      };

      await crearUsuario(user);

      console.log("Usuario registrado con éxito");
      await dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const onError = (errors) => {
    console.log("Errores en el formulario:", errors);
  };



  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Card style={{ height: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Space direction="vertical" size="middle">
            <Title>Registro</Title>

            {/* Nombre Completo */}
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nombre Completo"
                  prefix={<UserOutlined />}
                />
              )}
            />
            {errors.fullName && <span>{errors.fullName.message}</span>}

            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{ required: "El email es obligatorio" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="E-mail"
                  prefix={<MailOutlined />}
                />
              )}
            />
            {errors.email && <span>{errors.email.message}</span>}

            {/* Contraseña */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                />
              )}
            />
            {errors.password && <span>{errors.password.message}</span>}

            {/* Confirmar Contraseña */}
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirmar Contraseña"
                  prefix={<LockOutlined />}
                />
              )}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}

            {/* Términos y condiciones */}
            <Controller
              name="terms"
              control={control}
              rules={{ required: "Debes aceptar los términos" }}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value}>
                  Acepto los términos y condiciones
                </Checkbox>
              )}
            />
            {errors.terms && <span>{errors.terms.message}</span>}

            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Space>
        </form>
      </Card>
    </Flex>
  );
}
