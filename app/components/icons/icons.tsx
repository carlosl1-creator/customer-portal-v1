// Simple SVG icon components for the navigation bar

export function HomeIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

export function TestTubeIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7L6.81997 21.18C6.28843 21.7057 5.57048 21.9997 4.82291 21.9978C4.07534 21.9959 3.35887 21.6983 2.82997 21.17C2.29993 20.6394 2.0022 19.92 2.0022 19.17C2.0022 18.42 2.29993 17.7006 2.82997 17.17L17 3M16 2L22 8M12 16H4"
        stroke="#181D27"
      />
    </svg>
  );
}

export function CompareIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15ZM18 15V8C18 7.46957 17.7893 6.96086 17.4142 6.58579C17.0391 6.21071 16.5304 6 16 6H13M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9ZM6 9V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H11" stroke="#181D27"
      />
    </svg>
  );
}

export function ServerIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6H6.01M6 18H6.01M4 2H20C21.1046 2 22 2.89543 22 4V8C22 9.10457 21.1046 10 20 10H4C2.89543 10 2 9.10457 2 8V4C2 2.89543 2.89543 2 4 2ZM4 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V16C2 14.8954 2.89543 14 4 14Z" />
    </svg>
  );
}

export function SettingsIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

export function LogOutIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
      />
    </svg>
  );
}

export function LogoIcon({ className = "w-11 h-11", darkMode = false }: { className?: string; darkMode?: boolean }) {
  const fill = darkMode ? "#FDFDFD" : "#181D27";
  return (
    <div className={className} >
      <img src="/rl_logo.svg" alt="Reinforce Labs Logo" />
    </div>
  );
}

export function ArrowUpRightIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

export function ListIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export function DownloadIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}

export function ClipboardIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 11.3333H2.16667C1.72464 11.3333 1.30072 11.1577 0.988155 10.8452C0.675595 10.5326 0.5 10.1087 0.5 9.66667V2.16667C0.5 1.72464 0.675595 1.30072 0.988155 0.988155C1.30072 0.675595 1.72464 0.5 2.16667 0.5H9.66667C10.1087 0.5 10.5326 0.675595 10.8452 0.988155C11.1577 1.30072 11.3333 1.72464 11.3333 2.16667V3M8 6.33333H15.5C16.4205 6.33333 17.1667 7.07953 17.1667 8V15.5C17.1667 16.4205 16.4205 17.1667 15.5 17.1667H8C7.07953 17.1667 6.33333 16.4205 6.33333 15.5V8C6.33333 7.07953 7.07953 6.33333 8 6.33333Z" stroke="#414651" stroke-linecap="round" stroke-linejoin="round"
      />
    </svg>
  );
}

// Simple placeholder icons for Slack and Jira (you can replace these with actual brand icons later)
export function SlackIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M14.6876 7.49973C15.5505 7.49973 16.25 6.80024 16.25 5.93737C16.25 5.0745 15.5504 4.375 14.6876 4.375C13.8246 4.375 13.125 5.07456 13.125 5.9375V7.49973H14.6876ZM10.3125 7.49973C11.1754 7.49973 11.875 6.80018 11.875 5.93723V1.5625C11.875 0.699556 11.1754 0 10.3125 0C9.44956 0 8.75 0.699555 8.75 1.5625V5.93723C8.75 6.80018 9.44956 7.49973 10.3125 7.49973Z" fill="#2EB67D" />
      <path d="M1.56237 8.75027C0.699496 8.75027 1.43051e-06 9.44976 1.43051e-06 10.3126C1.43051e-06 11.1755 0.699563 11.875 1.56243 11.875C2.42538 11.875 3.125 11.1754 3.125 10.3125V8.75027H1.56237ZM5.9375 8.75027C5.07456 8.75027 4.375 9.44982 4.375 10.3128V14.6875C4.375 15.5504 5.07456 16.25 5.9375 16.25C6.80044 16.25 7.5 15.5504 7.5 14.6875V10.3128C7.5 9.44982 6.80044 8.75027 5.9375 8.75027Z" fill="#E01E5A" />
      <path d="M8.75015 14.6876C8.75015 15.5505 9.44964 16.25 10.3125 16.25C11.1754 16.25 11.8749 15.5504 11.8749 14.6876C11.8749 13.8246 11.1753 13.125 10.3124 13.125L8.75015 13.125L8.75015 14.6876ZM8.75015 10.3125C8.75015 11.1754 9.4497 11.875 10.3126 11.875L14.6874 11.875C15.5503 11.875 16.2499 11.1754 16.2499 10.3125C16.2499 9.44956 15.5503 8.75 14.6874 8.75L10.3126 8.75C9.4497 8.75 8.75015 9.44955 8.75015 10.3125Z" fill="#ECB22E" />
      <path d="M7.49985 1.56237C7.49985 0.699496 6.80036 7.74085e-07 5.93749 7.36368e-07C5.07462 6.9865e-07 4.37512 0.699563 4.37512 1.56243C4.37512 2.42538 5.07468 3.125 5.93762 3.125L7.49985 3.125L7.49985 1.56237ZM7.49985 5.9375C7.49985 5.07456 6.8003 4.375 5.93735 4.375L1.56262 4.375C0.699678 4.375 0.000122176 5.07456 0.000122139 5.9375C0.000122101 6.80044 0.699677 7.5 1.56262 7.5L5.93735 7.5C6.8003 7.5 7.49985 6.80045 7.49985 5.9375Z" fill="#36C5F0" />
    </svg>
  );
}

export function JiraIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.2905 8.2603L9.50469 0.729937L8.75 0L2.88918 5.66856L0.209538 8.2603C-0.0698458 8.53085 -0.0698458 8.96915 0.209538 9.2397L5.56404 14.4186L8.75 17.5L14.6108 11.8314L14.7016 11.7437L17.2905 9.2397C17.5698 8.96915 17.5698 8.53085 17.2905 8.2603ZM8.75 11.3371L6.07514 8.75L8.75 6.16288L11.4249 8.75L8.75 11.3371Z" fill="#2684FF" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75008 6.1626C6.99878 4.46855 6.99025 1.72472 8.73098 0.0205078L2.87732 5.67983L6.06328 8.76127L8.75008 6.1626Z" fill="url(#paint0_linear_3376_1390)" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.432 8.74316L8.75 11.3372C9.5953 12.1543 10.0702 13.2628 10.0702 14.4187C10.0702 15.5745 9.5953 16.683 8.75 17.5001L14.618 11.8246L11.432 8.74316Z" fill="url(#paint1_linear_3376_1390)" />
      <defs>
        <linearGradient id="paint0_linear_3376_1390" x1="8.27243" y1="3.54545" x2="3.81041" y2="5.49365" gradientUnits="userSpaceOnUse">
          <stop offset="0.18" stop-color="#0052CC" />
          <stop offset="1" stop-color="#2684FF" />
        </linearGradient>
        <linearGradient id="paint1_linear_3376_1390" x1="9.26109" y1="13.9243" x2="13.7151" y2="11.99" gradientUnits="userSpaceOnUse">
          <stop offset="0.18" stop-color="#0052CC" />
          <stop offset="1" stop-color="#2684FF" />
        </linearGradient>
      </defs>    </svg>
  );
}

export function ThumbsUpIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 10V22M15 5.88L14 10H19.83C20.1405 10 20.4467 10.0723 20.7244 10.2111C21.0021 10.35 21.2437 10.5516 21.43 10.8C21.6163 11.0484 21.7422 11.3367 21.7977 11.6422C21.8533 11.9477 21.8369 12.2619 21.75 12.56L19.42 20.56C19.2988 20.9754 19.0462 21.3404 18.7 21.6C18.3538 21.8596 17.9327 22 17.5 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H6.76C7.13208 9.9998 7.49674 9.89581 7.81296 9.69972C8.12917 9.50363 8.38442 9.22321 8.55 8.89L12 2C12.4716 2.00584 12.9357 2.11817 13.3578 2.3286C13.7799 2.53902 14.1489 2.84211 14.4374 3.2152C14.7259 3.5883 14.9263 4.02176 15.0237 4.4832C15.1212 4.94464 15.113 5.42213 15 5.88Z" 
      />
    </svg>
  );
}

export function ThumbsDownIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 14V2M8.99992 18.12L9.99992 14H4.16992C3.85943 14 3.55321 13.9277 3.27549 13.7889C2.99778 13.65 2.75622 13.4484 2.56992 13.2C2.38363 12.9516 2.25772 12.6633 2.20218 12.3578C2.14664 12.0523 2.16298 11.7381 2.24992 11.44L4.57992 3.44C4.70109 3.02457 4.95373 2.65964 5.29992 2.4C5.64611 2.14036 6.06718 2 6.49992 2H19.9999C20.5304 2 21.0391 2.21071 21.4141 2.58579C21.7892 2.96086 21.9999 3.46957 21.9999 4V12C21.9999 12.5304 21.7892 13.0391 21.4141 13.4142C21.0391 13.7893 20.5304 14 19.9999 14H17.2399C16.8678 14.0002 16.5032 14.1042 16.187 14.3003C15.8707 14.4964 15.6155 14.7768 15.4499 15.11L11.9999 22C11.5283 21.9942 11.0642 21.8818 10.6421 21.6714C10.2201 21.461 9.85099 21.1579 9.56252 20.7848C9.27404 20.4117 9.07361 19.9782 8.97618 19.5168C8.87876 19.0554 8.88688 18.5779 8.99992 18.12Z"      />
    </svg>
  );
}

export function CropIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.63 0.5L5.5 15.5C5.5 16.0304 5.71071 16.5391 6.08579 16.9142C6.46086 17.2893 6.96957 17.5 7.5 17.5H22.5M0.5 5.63L15.5 5.5C16.0304 5.5 16.5391 5.71071 16.9142 6.08579C17.2893 6.46086 17.5 6.96957 17.5 7.5V22.5" stroke="#181D27" stroke-linecap="round" stroke-linejoin="round" 
      />
    </svg>
  );
}

export function FeatherIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7.99955L2 21.9995M17.5 14.9995H9M20.24 12.2395C21.3658 11.1137 21.9983 9.58673 21.9983 7.99455C21.9983 6.40236 21.3658 4.87539 20.24 3.74955C19.1142 2.6237 17.5872 1.99121 15.995 1.99121C14.4028 1.99121 12.8758 2.6237 11.75 3.74955L5 10.4995V18.9995H13.5L20.24 12.2395Z"
      />
    </svg>
  );
}

export function HelpIcon({ className = "w-4 h-4", stroke = "#A4A7AE" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
      />
    </svg>
  );
}

export function HashIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.33331 7.5H16.6666M3.33331 12.5H16.6666M8.33331 2.5L6.66665 17.5M13.3333 2.5L11.6666 17.5"
      />
    </svg>
  );
}

export function MaximizeIcon({ className = "w-5 h-5", stroke = "#535862" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  );
}

export function LockIcon({ className = "w-4 h-4", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

export function XIcon({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function PlusIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

export function CalendarIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
      />
    </svg>
  );
}

export function ChevronUpIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

export function MoreVerticalIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  );
}

export function FilterIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
      />
    </svg>
  );
}

export function TrashIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export function EditIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

export function UploadIcon({ className = "w-5 h-5", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

