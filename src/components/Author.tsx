import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AuthorAvatarProps = {
  postedString: string;
};

export function Author({ postedString }: AuthorAvatarProps) {
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
        <time className="text-muted-foreground">{postedString}</time>
      </div>
    </div>
  );
}
