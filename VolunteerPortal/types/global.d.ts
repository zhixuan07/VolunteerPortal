interface EventData {
    id?: string; // Optional for new events
    title: string;
    purpose: string;
    orgId: string;
    description: string;
    role: string;
    date: string;
    eventType: string;
    startTime: string;
    endTime: string;
    location: string;
    status: string;
    image?: File | string; // Either a File object or a URL string
  }