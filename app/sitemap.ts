import type { MetadataRoute } from "next";
import massUnits from "@/src/data/mass";
import lengthUnits from "@/src/data/length";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [''];

  urls.push(
    ...Object.keys(lengthUnits).flatMap((a) => [
      `units/length/${a}/-`,
      `units/length/-/${a}`,
      ...Object.keys(lengthUnits).map((b) => `units/length/${a}/${b}`),
    ])
  );

  urls.push(
    ...Object.keys(massUnits).flatMap((a) => [
      `units/mass/${a}/-`,
      `units/mass/-/${a}`,
      ...Object.keys(massUnits).map((b) => `units/mass/${a}/${b}`),
    ])
  );

  urls.push("base/-/-", "units/length/-/-", "units/mass/-/-");

  const bases = Array(69)
    .fill(0)
    .map((_, i) => (i + 2).toString());

  urls.push(
    ...bases.flatMap((a) => [
      `base/${a}/-`,
      `base/-/${a}`,
      ...bases.map((b) => `base/${a}/${b}`),
    ])
  );

  urls.push("trigonometry/sin", "trigonometry/cos", "trigonometry/tan");

  return urls.map((url) => ({ url: `https://utilz.eu/${url}` }));
}
