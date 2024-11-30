'use client';
import { useContext } from 'react';
import ThemeContext from '@/context/theme-context';

const LogoUNRN = ({ className }: { className?: string }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <svg
      width="260"
      height="29"
      viewBox="0 0 260 29"
      fill={theme === 'light' ? '#101820' : '#FCF6F5'}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M23.2362 15.5977C23.2362 19.6628 22.3142 22.0648 20.4704 23.9129C18.6266 25.7603 15.6757 26.9058 11.6185 26.9058C7.56131 26.9058 4.61043 25.7603 2.76659 23.9129C0.922751 22.0648 9.15527e-05 19.6628 9.15527e-05 15.5977V0.999943H8.37215V15.9672C8.37215 17.4822 8.66761 18.1848 9.22076 18.7387C9.77391 19.2933 10.5114 19.6628 11.6185 19.6628C12.7248 19.6628 13.4623 19.2933 14.0155 18.7387C14.5694 18.1841 14.8271 17.4451 14.8271 15.9672V0.999943H23.2354V15.5977H23.2362Z" />
      <path d="M52.0033 26.5H43.3358L35.5902 12.2717C35.5902 12.2717 35.7746 15.0431 35.7746 16.8905V26.5H27.6609V0.999929H36.6965L44.0733 15.2275C44.0733 15.2275 43.8889 12.456 43.8889 10.6079V0.999929H52.0033V26.5Z" />
      <path d="M79.6641 26.5H70.0739L66.0175 17.9997H64.9474V26.5H56.6124V0.999929H67.6777C70.8114 0.999929 73.2092 1.55452 75.053 2.84807C76.8969 4.14162 78.1883 6.35924 78.1883 9.12997C78.1883 14.3042 75.053 16.1516 73.946 16.8172L79.6641 26.5ZM68.858 7.76312C68.4892 7.46768 67.9354 7.28257 67.0134 7.28257H64.9112V11.7171H67.0134C67.9354 11.7171 68.5255 11.532 68.858 11.2735C69.2645 10.9774 69.7807 10.6079 69.7807 9.49945C69.7807 8.39101 69.2268 8.02227 68.858 7.76312Z" />
      <path d="M106.219 26.5H97.5511L89.8062 12.2724C89.8062 12.2724 89.9913 15.0439 89.9913 16.8913V26.5H81.8762V0.999929H90.9125L98.2886 15.2275C98.2886 15.2275 98.105 12.456 98.105 10.6079V0.999929H106.219V26.5Z" />
      <path d="M120.433 5.91233V0.405854H121.501V5.84304C121.501 7.89907 122.57 9.03588 124.396 9.03588C126.142 9.03588 127.251 7.98006 127.251 5.91135V0.404879H128.319V5.83036C128.319 8.60262 126.736 10.0234 124.369 10.0234C122.029 10.0244 120.433 8.58896 120.433 5.91233Z" />
      <path d="M130.674 2.88219H131.716V4.09999C132.188 3.34277 132.906 2.73484 134.111 2.73484C135.787 2.73484 136.789 3.87068 136.789 5.53247V9.8748H135.747V5.78911C135.747 4.49227 135.057 3.6804 133.813 3.6804C132.61 3.6804 131.717 4.5596 131.717 5.87108V9.8748H130.675V2.88219H130.674Z" />
      <path d="M139.035 0.205748H140.226V1.35525H139.035V0.205748ZM139.102 2.88238H140.145V9.875H139.102V2.88238Z" />
      <path d="M141.876 2.88234H143.025L145.379 8.68448L147.747 2.88234H148.87L145.825 9.92961H144.906L141.876 2.88234Z" />
      <path d="M151.13 6.80493C151.279 8.27937 152.361 9.13125 153.591 9.13125C154.565 9.13125 155.214 8.73799 155.796 8.14373L156.446 8.72531C155.742 9.52352 154.904 10.0378 153.564 10.0378C151.657 10.0378 150.074 8.56333 150.074 6.3863C150.074 4.35663 151.481 2.73484 153.429 2.73484C155.499 2.73484 156.689 4.38395 156.689 6.43997C156.689 6.5356 156.689 6.64392 156.676 6.8059L151.13 6.80493ZM155.635 5.96671C155.527 4.70792 154.769 3.61307 153.403 3.61307C152.212 3.61307 151.279 4.61327 151.13 5.96671H155.635Z" />
      <path d="M158.517 2.8823H159.559V4.70803C160.072 3.54585 161.087 2.72032 162.413 2.76032V3.8825H162.332C160.803 3.8825 159.559 4.97931 159.559 7.08802V9.87394H158.517V2.8823Z" />
      <path d="M163.414 8.98207L163.942 8.2385C164.7 8.82008 165.538 9.13137 166.363 9.13137C167.215 9.13137 167.811 8.71177 167.811 8.02285V7.99553C167.811 7.30564 166.986 7.0207 166.066 6.76406C164.985 6.43912 163.753 6.08783 163.753 4.79001V4.76366C163.753 3.5605 164.754 2.76033 166.134 2.76033C167 2.76033 167.933 3.05796 168.651 3.53122L168.177 4.31772C167.527 3.89715 166.797 3.64051 166.107 3.64051C165.281 3.64051 164.754 4.07279 164.754 4.65437V4.68169C164.754 5.34426 165.62 5.6009 166.554 5.88486C167.636 6.21078 168.799 6.63038 168.799 7.88722V7.91356C168.799 9.2387 167.703 10.0106 166.31 10.0106C165.295 10.0115 164.213 9.61829 163.414 8.98207Z" />
      <path d="M170.761 0.205748H171.952V1.35525H170.761V0.205748ZM170.827 2.88238H171.87V9.875H170.827V2.88238Z" />
      <path d="M173.886 6.39838V6.373C173.886 4.10035 175.55 2.73423 177.226 2.73423C178.525 2.73423 179.363 3.42412 179.905 4.22038V2.28882e-05H180.946V9.87419H179.905V8.46806C179.323 9.30627 178.525 10.0245 177.226 10.0245C175.55 10.0245 173.886 8.7003 173.886 6.39838ZM179.947 6.38666V6.35837C179.947 4.75024 178.714 3.66807 177.416 3.66807C176.064 3.66807 174.954 4.66925 174.954 6.35837V6.38666C174.954 8.04944 176.077 9.09062 177.416 9.09062C178.714 9.09062 179.947 7.99577 179.947 6.38666Z" />
      <path d="M182.748 7.84639V7.82005C182.748 6.31926 183.965 5.53276 185.737 5.53276C186.642 5.53276 187.239 5.65571 187.873 5.83233V5.6157C187.873 4.37155 187.117 3.72264 185.803 3.72264C184.979 3.72264 184.33 3.91195 183.681 4.22225L183.369 3.37037C184.14 3.00542 184.885 2.77513 185.913 2.77513C186.9 2.77513 187.658 3.03372 188.171 3.54699C188.659 4.03294 188.902 4.72381 188.902 5.60204V9.87607H187.873V8.83488C187.386 9.47111 186.589 10.0263 185.357 10.0263C184.046 10.0244 182.748 9.29351 182.748 7.84639ZM187.888 7.3058V6.65591C187.361 6.50759 186.711 6.35731 185.845 6.35731C184.547 6.35731 183.803 6.91254 183.803 7.76442V7.79174C183.803 8.66997 184.628 9.18422 185.561 9.18422C186.846 9.1852 187.888 8.427 187.888 7.3058Z" />
      <path d="M190.703 6.39838V6.373C190.703 4.10035 192.367 2.73423 194.043 2.73423C195.342 2.73423 196.182 3.42412 196.723 4.22038V2.28882e-05H197.764V9.87419H196.723V8.46806C196.142 9.30627 195.342 10.0245 194.043 10.0245C192.366 10.0245 190.703 8.7003 190.703 6.39838ZM196.762 6.38666V6.35837C196.762 4.75024 195.532 3.66807 194.234 3.66807C192.88 3.66807 191.773 4.66925 191.773 6.35837V6.38666C191.773 8.04944 192.895 9.09062 194.234 9.09062C195.532 9.09062 196.762 7.99577 196.762 6.38666Z" />
      <path d="M204.326 0.406555H205.328L211.294 7.99539V0.406555H212.336V9.87479H211.482L205.369 2.11226V9.87479H204.326V0.406555Z" />
      <path d="M214.31 7.84639V7.82005C214.31 6.31926 215.528 5.53276 217.301 5.53276C218.208 5.53276 218.802 5.65571 219.437 5.83233V5.6157C219.437 4.37155 218.68 3.72264 217.367 3.72264C216.543 3.72264 215.893 3.91195 215.243 4.22225L214.933 3.37037C215.703 3.00542 216.449 2.77513 217.475 2.77513C218.463 2.77513 219.219 3.03372 219.733 3.54699C220.221 4.03294 220.463 4.72381 220.463 5.60204V9.87607H219.436V8.83488C218.948 9.47111 218.151 10.0263 216.92 10.0263C215.61 10.0244 214.31 9.29351 214.31 7.84639ZM219.45 7.3058V6.65591C218.922 6.50759 218.274 6.35731 217.407 6.35731C216.109 6.35731 215.365 6.91254 215.365 7.76442V7.79174C215.365 8.66997 216.191 9.18422 217.125 9.18422C218.408 9.1852 219.45 8.427 219.45 7.3058Z" />
      <path d="M222.24 6.41265V6.3863C222.24 4.39761 223.768 2.73484 225.823 2.73484C227.149 2.73484 227.961 3.27544 228.625 3.97899L227.933 4.70792C227.38 4.12634 226.771 3.65308 225.809 3.65308C224.391 3.65308 223.307 4.84356 223.307 6.35703V6.38533C223.307 7.89978 224.419 9.10392 225.879 9.10392C226.786 9.10392 227.462 8.657 228.015 8.06274L228.678 8.68433C227.975 9.48156 227.137 10.0378 225.823 10.0378C223.768 10.0378 222.24 8.37402 222.24 6.41265Z" />
      <path d="M230.426 0.205748H231.615V1.35525H230.426V0.205748ZM230.493 2.88238H231.533V9.875H230.493V2.88238Z" />
      <path d="M233.523 6.41265V6.3863C233.523 4.39761 235.051 2.73484 237.174 2.73484C239.284 2.73484 240.813 4.38395 240.813 6.35801V6.3863C240.813 8.37402 239.258 10.0378 237.148 10.0378C235.052 10.0378 233.523 8.38768 233.523 6.41265ZM239.744 6.41265V6.3863C239.744 4.88454 238.622 3.65308 237.148 3.65308C235.633 3.65308 234.59 4.88454 234.59 6.35703V6.38533C234.59 7.88612 235.7 9.10392 237.174 9.10392C238.69 9.1049 239.744 7.87441 239.744 6.41265Z" />
      <path d="M242.695 2.88219H243.737V4.09999C244.21 3.34277 244.927 2.73484 246.131 2.73484C247.809 2.73484 248.809 3.87068 248.809 5.53247V9.8748H247.769V5.78911C247.769 4.49227 247.077 3.6804 245.835 3.6804C244.63 3.6804 243.738 4.5596 243.738 5.87108V9.8748H242.696L242.695 2.88219Z" />
      <path d="M250.503 7.84639V7.82005C250.503 6.31926 251.719 5.53276 253.493 5.53276C254.398 5.53276 254.993 5.65571 255.629 5.83233V5.6157C255.629 4.37155 254.871 3.72264 253.559 3.72264C252.733 3.72264 252.086 3.91195 251.434 4.22225L251.123 3.37037C251.895 3.00542 252.639 2.77513 253.667 2.77513C254.655 2.77513 255.411 3.03372 255.926 3.54699C256.412 4.03294 256.656 4.72381 256.656 5.60204V9.87607H255.628V8.83488C255.14 9.47111 254.344 10.0263 253.11 10.0263C251.801 10.0244 250.503 9.29351 250.503 7.84639ZM255.643 7.3058V6.65591C255.115 6.50759 254.467 6.35731 253.599 6.35731C252.299 6.35731 251.556 6.91254 251.556 7.76442V7.79174C251.556 8.66997 252.381 9.18422 253.315 9.18422C254.6 9.1852 255.643 8.427 255.643 7.3058Z" />
      <path d="M258.958 0.000495911H260V9.87466H258.958V0.000495911Z" />
      <path d="M120 22.6339V22.6065C120 20.3339 121.664 18.9678 123.342 18.9678C124.64 18.9678 125.479 19.6577 126.02 20.4559V16.2365H127.062V26.1097H126.019V24.7035C125.438 25.5427 124.639 26.259 123.341 26.259C121.664 26.258 120 24.9329 120 22.6339ZM126.059 22.6192V22.5929C126.059 20.9828 124.829 19.8997 123.53 19.8997C122.177 19.8997 121.069 20.9008 121.069 22.5929V22.6192C121.069 24.283 122.191 25.3242 123.53 25.3242C124.83 25.3251 126.059 24.2303 126.059 22.6192Z" />
      <path d="M130.011 23.0386C130.16 24.5131 131.242 25.3649 132.473 25.3649C133.447 25.3649 134.096 24.9746 134.678 24.3774L135.327 24.96C134.624 25.7572 133.785 26.2715 132.446 26.2715C130.539 26.2715 128.956 24.798 128.956 22.62C128.956 20.5923 130.362 18.9676 132.311 18.9676C134.381 18.9676 135.571 20.6186 135.571 22.6747C135.571 22.7693 135.571 22.8776 135.558 23.0396L130.011 23.0386ZM134.516 22.2004C134.408 20.9426 133.65 19.8477 132.284 19.8477C131.093 19.8477 130.16 20.848 130.011 22.2004H134.516Z" />
      <path d="M141.431 16.6403H145.759C146.963 16.6403 147.882 16.9652 148.519 17.6005C149.06 18.1411 149.331 18.8593 149.331 19.7658V19.7912C149.331 21.3193 148.506 22.2805 147.302 22.7274L149.615 26.1085H147.18L145.151 23.0796H145.124H143.514V26.1085H141.431V16.6403ZM145.623 21.2402C146.652 21.2402 147.22 20.7123 147.22 19.8995V19.8741C147.22 18.9666 146.611 18.5216 145.583 18.5216H143.513V21.2402H145.623Z" />
      <path d="M151.09 18.8601H153.146V26.1094H151.09V18.8601ZM152.754 15.6673L154.526 16.4372L152.794 18.0619H151.225L152.754 15.6673Z" />
      <path d="M154.728 22.5253V22.499C154.728 20.4156 156.405 18.7245 158.665 18.7245C160.896 18.7245 162.574 20.3756 162.574 22.4716V22.499C162.574 24.5823 160.896 26.2714 158.637 26.2714C156.405 26.2714 154.728 24.6204 154.728 22.5253ZM160.545 22.5253V22.499C160.545 21.4304 159.773 20.4976 158.637 20.4976C157.46 20.4976 156.758 21.3885 156.758 22.4707V22.498C156.758 23.5675 157.529 24.4993 158.665 24.4993C159.842 24.4993 160.545 23.6065 160.545 22.5253Z" />
      <path d="M168.339 16.6403H170.26L174.696 22.4707V16.6403H176.752V26.1085H174.98L170.394 20.0898V26.1085H168.339V16.6403Z" />
      <path d="M178.459 22.5253V22.499C178.459 20.4293 179.932 18.7245 182.042 18.7245C184.463 18.7245 185.573 20.6049 185.573 22.6609C185.573 22.8239 185.559 23.0005 185.546 23.2015H180.501C180.703 24.1364 181.353 24.6213 182.273 24.6213C182.962 24.6213 183.449 24.4057 184.031 23.8768L185.208 24.9189C184.518 25.7708 183.558 26.2714 182.246 26.2714C180.069 26.2714 178.459 24.7433 178.459 22.5253ZM183.571 21.9164C183.449 20.9982 182.91 20.3756 182.043 20.3756C181.178 20.3756 180.638 20.9825 180.475 21.9164H183.571Z" />
      <path d="M187.144 27.5428L187.847 26C188.605 26.4206 189.322 26.6636 190.296 26.6636C191.703 26.6636 192.366 25.9873 192.366 24.6885V24.3382C191.757 25.0828 191.094 25.5151 189.998 25.5151C188.307 25.5151 186.779 24.2982 186.779 22.1329V22.1056C186.779 19.9413 188.334 18.7234 189.998 18.7234C191.122 18.7234 191.783 19.1967 192.338 19.8056V18.8591H194.394V24.4719C194.394 25.7561 194.082 26.7182 193.474 27.3252C192.783 28.016 191.756 28.3 190.349 28.3C189.159 28.301 188.064 28.0297 187.144 27.5428ZM192.366 22.1319V22.1056C192.366 21.1181 191.607 20.4282 190.594 20.4282C189.593 20.4282 188.835 21.1181 188.835 22.1056V22.1319C188.835 23.1478 189.579 23.8094 190.594 23.8094C191.607 23.8094 192.366 23.1195 192.366 22.1319Z" />
      <path d="M196.236 18.8602H198.293V20.32C198.711 19.3316 199.375 18.6709 200.605 18.7236V20.8743H200.498C199.133 20.8743 198.293 21.6862 198.293 23.4309V26.1085H196.236V18.8602Z" />
      <path d="M201.541 22.5253V22.499C201.541 20.4156 203.217 18.7245 205.476 18.7245C207.709 18.7245 209.387 20.3756 209.387 22.4716V22.499C209.387 24.5823 207.709 26.2714 205.45 26.2714C203.217 26.2714 201.541 24.6204 201.541 22.5253ZM207.357 22.5253V22.499C207.357 21.4304 206.585 20.4976 205.449 20.4976C204.271 20.4976 203.569 21.3885 203.569 22.4707V22.498C203.569 23.5675 204.34 24.4993 205.476 24.4993C206.652 24.4993 207.357 23.6065 207.357 22.5253Z" />
    </svg>
  );
};

export default LogoUNRN;