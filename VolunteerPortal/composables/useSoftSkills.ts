import { SoftSkill } from "~/types/enum";

export const useSoftSkills = () => useState<SoftSkill[]>("SoftSkills", () => [
    SoftSkill.Communication,
    SoftSkill.CriticalThinking,
    SoftSkill.Creativity,
    SoftSkill.Leadership,
    SoftSkill.ProblemSolving,
    SoftSkill.Teamwork,
    ]);