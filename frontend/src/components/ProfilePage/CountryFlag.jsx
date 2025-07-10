import ReactCountryFlag from "react-country-flag";

export default function CountryFlag({ code }) {
  return <ReactCountryFlag countryCode={code} svg></ReactCountryFlag>;
}
