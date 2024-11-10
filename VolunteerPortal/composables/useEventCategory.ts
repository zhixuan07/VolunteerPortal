
import { EventCategory } from '~/types/enum'

export const useEventCategories = () => useState<EventCategory[]>('EventCategories', () => [
    EventCategory.Animal,
    EventCategory.Community,
    EventCategory.Climate,
    EventCategory.Disaster,
    EventCategory.Elderly,
    EventCategory.Environmental,
    EventCategory.Farm,
    EventCategory.International,
    EventCategory.Skills,
    EventCategory.Sports,
    
])
