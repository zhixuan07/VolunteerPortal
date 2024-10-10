
import { SoftSkill } from '~/types/enum'

export const useSoftSkills = () => useState<SoftSkill[]>('softSkills', () => [
  SoftSkill.Communication,
  SoftSkill.Teamwork,
  SoftSkill.ProblemSolving,
  SoftSkill.Adaptability,
  SoftSkill.TimeManagement,
  SoftSkill.Leadership,
  SoftSkill.Creativity,
  SoftSkill.CriticalThinking
])