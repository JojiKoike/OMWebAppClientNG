export function celsius2kelvin(t_celsius: number): number {
  return t_celsius + 273.15;
}

export function kelvin2celsius(t_kelvin: number): number {
  return t_kelvin - 273.15;
}

export function millimeter2meter(l_millimeter: number): number {
  return l_millimeter / 1000.0;
}

export function meter2millimeter(l_meter: number): number {
  return l_meter * 1000.0;
}
