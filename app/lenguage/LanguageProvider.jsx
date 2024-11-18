const LanguageProvider = {
  // Textos en ingles
  en: {
    components: {
      menuItems: {
        routes: "Routes",
        bed: "Accommodation",
        food: "Gastronomy",
        events: "Events",
        tourism: "Tourism",
        itineraries: "Itineraries",
        myProfile: "My profile",
        logOut: "Log out",
      },
    },
    AlertMessagelogOut: {
      title: "Log ou",
      message: "Are you sure you want to log out?",
      confirmButtonTitle: "Yes",
      cancelButtonTitle: "No",
    },
    LoginScreen: {
      title: "Login with your account",
      loginButton: "Login",
      email: "Email",
      password: "Password",
      rememberMe: "Forgot your password?",
      signGoogle: "Continue with Google",
      signFacebook: "Continue with Facebook",
      dontAccount: "Don't have an account?",
      signUp: ", Sign up",
      messageLog: "Logging in...",
      enterEmail: {
        texts: {
          invalidEmail: "Please enter a valid email address.",
          errorNext: "Email field is required.",
          invalidPhone: "Please enter a valid phone number.",
          futureDate: "The selected date cannot be in the future.",
          dateFormat: "Please enter the date in DD-MM-YYYY format.",
        },
      },
      loginPassword: {
        texts: {
          passwordError: "Password must be at least 6 characters long.",
        },
      },
    },

    RegisterScreen: {
      createAccount: "Create your account",
      name: "Name/s",
      lastName: "Last name/s",
      register: "Register",
      alreadyAccount: "Already have an account?, ",
      nameError: "Name must be at least 5 characters long.",
      lastNameError: "Last name must be at least 5 characters long.",
      birthday: "Birthday",
      tel: "Phone",
      enterEmail: {
        texts: {
          invalidPhone: "Please enter a valid phone number.",
          futureDate: "The selected date cannot be in the future.",
          dateFormat: "Please enter the date in DD-MM-YYYY format.",
        },
      },
      recoverPassword: "Recover Password",
      sendLink: "Send link",
      passwordRecoveryMessage:
        "We have sent you an email with instructions to reset your password.",
      messageRecoveryIndication:
        "Please check your spam folder if you haven't received it.",
    },
    HomeScreen: {
      start: "Start",
      welcomeText: "Welcome",
      search: "Search",
      sectionTitleItineraries: "Try Our Itineraries",
      sectionSubtitleVisit: "You Must Visit →",
      sectionTitleContinue: "Continue Your Itinerary →",
    },
    ItinerariesScreen: {
      title: "Itineraries",
      createButtonText: "Create Itinerary",
      message:"Your next visits →",
      details:"Details",
      itinerariesDetailScreen:{
        title:"Itinerary Details",
      },
      CreateItinerariesScreen:{
        title:"New Itinerary",
      }
    },
    ProfileScreen: {
      title: "Profile",
      email: "Email",
      phoneNum: "Phone Number",
      changeLenguage: "Change Language",
      changePasswordTitle: "Change Password",
      logout:"Log out",
      changePassword:{
        passwordError: "Password must be at least 6 characters long.",
        notPassword:"Passwords do not match",
        currentPassword:"Current password",
        newPassword:"New password",
        confirmPassword:"Confirm password",
        change:"Change",
      }
    },
    RoutesScreen: {
      title: "Routes",
    },
    AccommodationScreen: {
      title: "Accommodation",
      message:"Available accommodations →",
    },
    GastronomyScreen: {
      title: "Gastronomy",
    },
    EventsScreen: {
      title: "Events",
    },
    TourismScreen: {
      title: "Tourism",
      message:"Places to visit →",
    },
  },

  // Textos en español
  spa: {
    components: {
      menuItems: {
        routes: "Rutas",
        bed: "Hospedaje",
        food: "Gastronomía",
        events: "Eventos",
        tourism: "Turismo",
        itineraries: "Itinerarios",
        myProfile: "Mi perfil",
        logOut: "Cerrar sesión",
      },
    },
    AlertMessagelogOut: {
      title: "Cerrar Sesión",
      message: "¿Estás seguro de que deseas cerrar la sesión?",
      confirmButtonTitle: "Si",
      cancelButtonTitle: "No",
    },
    LoginScreen: {
      title: "Inicia Sesión con tu cuenta",
      loginButton: "Iniciar Sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      rememberMe: "¿Olvidaste tu contraseña?",
      signGoogle: "Continua con Google",
      signFacebook: "Continua con Facebook",
      dontAccount: "¿No tienes una cuenta?",
      signUp: ", Regístrate",
      messageLog: "Iniciando sesión...",
      enterEmail: {
        texts: {
          invalidEmail:
            "Por favor ingrese una dirección de correo electrónico válida.",
          errorNext: "El campo de correo es obligatorio.",
          invalidPhone: "Por favor ingrese un número de teléfono válido.",
          futureDate: "La fecha seleccionada no puede ser en el futuro.",
          dateFormat: "Por favor ingrese la fecha en formato DD-MM-AAAA.",
        },
      },
      loginPassword: {
        texts: {
          passwordError: "La contraseña debe tener al menos 6 caracteres.",
        },
      },
    },
    RegisterScreen: {
      createAccount: "Crea tu Cuenta",
      name: "Nombre/s",
      lastName: "Apellido/s",
      register: "Regístrate",
      alreadyAccount: "¿Ya tienes una cuenta?, ",
      nameError: "El nombre debe tener al menos 5 caracteres.",
      lastNameError: "El apellido debe tener al menos 5 caracteres.",
      birthday: "Cumpleaños",
      tel: "Teléfono",
      enterEmail: {
        texts: {
          invalidPhone: "Por favor ingrese un número de teléfono válido.",
          futureDate: "La fecha seleccionada no puede ser en el futuro.",
          dateFormat: "Por favor ingrese la fecha en formato DD-MM-AAAA.",
        },
      },
      recoverPassword: "Recuperar Contraseña",
      sendLink: "Enviar Link",
      passwordRecoveryMessage:
        "Te hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.",
      messageRecoveryIndication:
        "Por favor revisa tu carpeta de spam si no has recibido el correo.",
    },
    HomeScreen: {
      start: "Inicio",
      welcomeText: "Bienvenido",
      search: "Buscar",
      sectionTitleItineraries: "Prueba Nuestros Itinerarios",
      sectionSubtitleVisit: "Debes Visitar →",
      sectionTitleContinue: "Continúa Tu Itinerario →",
    },
    ItinerariesScreen: {
      title: "Itinerarios",
      createButtonText: "Crear Itinerario",
      message:"Sus próximas visitas →",
      details:"Detalles",
      itinerariesDetailScreen:{
        title:"Detalles del Itinerario",
      },
      CreateItinerariesScreen:{
        title:"Nuevo Itinerario",
      }
    },
    ProfileScreen: {
      title: "Perfil",
      email: "Correo Electrónico",
      phoneNum: "Número de Teléfono",
      changeLenguage: "Cambiar Idioma",
      changePasswordTitle: "Cambiar Contraseña",
      logout:"Cerrar sesión",
      changePassword:{
        passwordError: "La contraseña debe tener al menos 6 caracteres.",
        notPassword:"Las contraseñas no coinciden",
        currentPassword:"Contraseña actual",
        newPassword:"Nueva contraseña",
        confirmPassword:"Confirmar contraseña",
        change:"Cambiar",
      }
    },
    RoutesScreen: {
      title: "Rutas",
    },
    AccommodationScreen: {
      title: "Hospedaje",
      message:"Hospedajes disponibles →",
    },
    GastronomyScreen: {
      title: "Gastronomía",
    },
    EventsScreen: {
      title: "Eventos",
    }, 
    TourismScreen: {
      title: "Turismo",
      message:"Lugares para visitar →",
    },
  },
};

export default LanguageProvider;
