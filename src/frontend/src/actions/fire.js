const angstron = ({
    temperture: t,
    moisture: h,
}) => Math.max(
    ((0.05 * h) - ((t - 27) * 0.1)),
    1
)

export const getFirePotential = ({
    temperture,
    moisture,
}) => {
    const hasTemperature = Number.isFinite(temperture);
    const hasMoisture = Number.isFinite(moisture);

    if (!hasTemperature || !hasMoisture) return {
        color: false,
        potential: false,
    }

    const firePotential = angstron({
        temperture,
        moisture,
    })
    const veryLikely = firePotential <= 1;
    const likely = !veryLikely && firePotential <= 2;
    const favorable = !veryLikely && !likely && firePotential <= 2.5;
    const unfavorable = !veryLikely && !likely && !favorable && firePotential <= 4;
    const unlikely = !veryLikely && !likely && !favorable && !unfavorable && firePotential > 4;

    const danger = veryLikely;
    const warning = favorable || likely;
    const ok = unfavorable || unlikely;

    const colorPerSituation = {
        [danger]: "danger",
        [warning]: "warning",
        [ok]: "success",
    }

    const potentialByStatus = {
        [veryLikely]: 95,
        [likely]: 80,
        [favorable]: 60,
        [unfavorable]: 40,
        [unlikely]: 20,
    }

    console.log({
        firePotential,
        temperture,
        moisture,
        veryLikely,
        likely,
        favorable,
        unfavorable,
        unlikely
    });

    const fireConfig = {
        color: colorPerSituation[true],
        potential: potentialByStatus[true]
    }

    return fireConfig
}