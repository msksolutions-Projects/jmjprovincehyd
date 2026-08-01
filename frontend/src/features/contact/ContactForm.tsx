import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  contactSchema,
  sendContactMessage,
  type ContactFormValues,
  type ContactResponse,
} from "./services/contact.service";

const defaultValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: true as const,
};

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitted },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ...defaultValues, consent: undefined as unknown as true },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const mutation = useMutation<ContactResponse, Error, ContactFormValues>({
    mutationFn: sendContactMessage,
    onSuccess: () => reset({ ...defaultValues, consent: undefined as unknown as true }),
  });

  const onInvalid = () => {
    const first = Object.keys(errors)[0] as keyof ContactFormValues | undefined;
    if (first) setFocus(first);
  };

  const fieldProps = (name: keyof ContactFormValues) => ({
    ...register(name),
    error: Boolean(errors[name]),
    helperText: errors[name]?.message,
    slotProps: {
      formHelperText: { id: `${name}-error` },
      htmlInput: { "aria-describedby": errors[name] ? `${name}-error` : undefined },
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((values) => mutation.mutate(values), onInvalid)}
    >
      <Stack spacing={2.5}>
        {mutation.isSuccess && (
          <Alert severity="success" role="status">
            <AlertTitle>Message sent</AlertTitle>
            Thank you. The provincial office will reply as soon as possible. Your reference is{" "}
            <strong>{mutation.data.reference}</strong>.
          </Alert>
        )}

        {mutation.isError && (
          <Alert severity="error" role="alert">
            <AlertTitle>Message not sent</AlertTitle>
            {mutation.error.message}
          </Alert>
        )}

        {isSubmitted && Object.keys(errors).length > 0 && (
          <Alert severity="warning" role="alert">
            Please correct the highlighted fields before sending.
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...fieldProps("fullName")}
              label="Full name"
              required
              fullWidth
              autoComplete="name"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...fieldProps("email")}
              label="Email"
              type="email"
              required
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...fieldProps("phone")}
              label="Phone"
              type="tel"
              fullWidth
              autoComplete="tel"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField {...fieldProps("subject")} label="Subject" required fullWidth />
          </Grid>
          <Grid size={12}>
            <TextField
              {...fieldProps("message")}
              label="Message"
              required
              fullWidth
              multiline
              minRows={6}
            />
          </Grid>
        </Grid>

        <Box>
          <FormControlLabel
            control={<Checkbox {...register("consent")} />}
            label="I consent to the Province storing these details in order to reply to my enquiry."
            sx={{ alignItems: "flex-start", "& .MuiCheckbox-root": { pt: 0.25 } }}
          />
          {errors.consent && (
            <FormHelperText error id="consent-error">
              {errors.consent.message}
            </FormHelperText>
          )}
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={mutation.isPending}
            startIcon={
              mutation.isPending ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <SendRoundedIcon />
              )
            }
          >
            {mutation.isPending ? "Sending…" : "Send message"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
