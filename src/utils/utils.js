export function estimateSolarCellIV(T, G, k, Ns) {
    const q = 1.6e-19;
    const K = 1.38e-23;
    const n = 1.3;
    const Eg0 = 1.1;
    const Rs = 0.221;
    const Rsh = 415.405;
    const Voc = 0.6*Ns;
    const Isc = 8.21;
    const Tn = 298;
    const Area = Ns * 0.024336;
    T = T + 273;

    const Irs = Isc / (Math.exp((q * Voc) / (n * Ns * K * T)) - 1);
    const Io = Irs * Math.pow((T / Tn), 3) * Math.exp((q * Eg0 * ((1 / Tn) - (1 / T))) / (n * K));
    const Iph = (Isc + k * (T - Tn)) * (G / 1000);

    const numPoints = 300;
    const VStep = Voc / numPoints;
    const IStep = Isc / numPoints;

    let ISolution = [];
    let VSolution = [];
    let PSolution = [];

    function calculateRHS(V, I) {
        return Iph - Io * (Math.exp((q * (V + I * Rs)) / (n * K * Ns * T)) - 1) - (V + I * Rs) / Rsh;
    }

    let maxP = 0;
    let maxI = 0;
    let maxV = 0;

    let maxEff = 0;

    for (let i = 0; i <= numPoints; i++) {
        const V = i * VStep;
        let minDiff = Infinity;
        let IForMinDiff = null;

        for (let j = 0; j <= numPoints; j++) {
            const I = j * IStep;
            const rhs = calculateRHS(V, I);
            const diff = Math.abs(I - rhs);

            if (diff < minDiff) {
                minDiff = diff;
                IForMinDiff = I;
            }
        }

        if (IForMinDiff !== null) {
            if (V * IForMinDiff > maxP) {
                maxP = (V * IForMinDiff).toFixed(2);
                maxI = IForMinDiff.toFixed(2);
                maxV = V.toFixed(2);
                maxEff = (V * IForMinDiff / (G * Area)).toFixed(4);
            }

            ISolution.push(IForMinDiff.toFixed(2));
            VSolution.push(V.toFixed(2));
            PSolution.push((V * IForMinDiff).toFixed(2));
        }
    }
    

    return { ISolution, VSolution, PSolution, maxI, maxV, maxP, maxEff };
}


export function optimizeEfficiency(T, G, k, Ns_min, Ns_max, step) {
    let maxEff = 0;
    let NsOptimized = 0;
    let PperCell = 0;

    for (let Ns = Ns_min; Ns <= Ns_max; Ns += step) {
        let result = estimateSolarCellIV(T, G, k, Ns);
        if (result.maxEff > maxEff) {
            maxEff = result.maxEff;
            NsOptimized = Ns;
            PperCell = (result.maxP / Ns).toFixed(2);
        }
    }

    return {maxEff, NsOptimized, PperCell};
}



export const cityData = {
    'Los Angeles': {T: 18.9, G: 252},
    'New York': {T: 12.8, G: 186},
    'Chicago': {T: 10.6, G: 186},
    'Houston': {T: 20.6, G: 216},
    'Phoenix': {T: 23.9, G: 271},
    'Miami': {T: 25, G: 233},
    'Seattle': {T: 11.1, G: 163},
    'Denver': {T: 10, G: 234},
    'Atlanta': {T: 16.1, G: 214},
    'Boston': {T: 11.1, G: 194},
    'San Francisco': {T: 13.9, G: 230},
    'Minneapolis': {T: 7.8, G: 190},
    'Dallas': {T: 18.9, G: 225},
    'Philadelphia': {T: 12.8, G: 198},
    'Las Vegas': {T: 20.6, G: 265},
    'Baltimore': {T: 12.2, G: 202},
    'San Diego': {T: 17.8, G: 237},
    'San Antonio': {T: 20, G: 226},
    'Orlando': {T: 22.2, G: 233},
    'Sacramento': {T: 16.1, G: 243},
    'Salt Lake City': {T: 11.1, G: 223},
    'Tampa': {T: 22.8, G: 238},
    'Portland': {T: 12.2, G: 168},
    'Charlotte': {T: 15, G: 214},
    'St. Louis': {T: 13.9, G: 202},
    'Nashville': {T: 15, G: 200},
    'Detroit': {T: 9.4, G: 185},
    'Columbus': {T: 11.1, G: 190},
    'Indianapolis': {T: 11.1, G: 193},
    'Milwaukee': {T: 8.9, G: 189},
    'Albuquerque': {T: 13.9, G: 266},
    'Austin': {T: 20.6, G: 223},
    'Buffalo': {T: 8.9, G: 176},
    'Charleston': {T: 19.4, G: 191},
    'Cleveland': {T: 10, G: 183},
    'Colorado Springs': {T: 8.9, G: 238},
    'Yuma': {T: 24, G: 370}
}