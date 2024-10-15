import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface AuthorAvatarProps {
  publishDate: Date;
}

export function Author({ publishDate }: AuthorAvatarProps) {
  return (
    <div className="my-4 flex items-center space-x-4">
      <Avatar>
        <img
          src="https://andre385.sirv.com/Portfolio%20%26%20Blog/profile_pic.jpeg?w=320&h=320"
          width="320"
          height="320"
          alt={"André Izarra Profile Picture"}
        />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-lg font-bold leading-none">André Izarra</p>
        <time
          dateTime={publishDate.toISOString()}
          className="text-muted-foreground"
        >
          Posted on {format(publishDate, "dd/MM/yyyy")}
        </time>
      </div>
    </div>
  );
}
