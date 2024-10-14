interface EventData {
    id?: string; // Optional for new events
    title: string;
    purpose: string;
    orgId: string;
    description: string;
    role: string;
    date: string;
    eventType: string;
    tags: string[];
    startTime: string;
    endTime: string;
    location: string;
    status: string;
    image:  string; // Either a File object or a URL string
  }

  interface OrganiserDetails {
    name: string;
    email: string;
    phoneNumber: string;
    user_id: string;
    description: string;
  }