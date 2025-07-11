import { TopBar } from "@/components/menubar";
import { UserCard } from "@/components/user-details";
export function Community() {
    const people = [
        {
            name: "Alice Johnson",
            role: "Senior Software Engineer",
            team: "Engineering Team",
            email: "alice.johnson@example.com",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            tags: ["Collaboration", "Innovation", "Growth"],
        },
        {
            name: "Bob Smith",
            role: "Product Manager",
            team: "Product Team",
            email: "bob.smith@example.com",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            tags: ["Leadership", "Strategy", "Vision"],
        },
        {
            name: "Carol Lee",
            role: "UX Designer",
            team: "Design Team",
            email: "carol.lee@example.com",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            tags: ["Creativity", "Empathy", "User Focus"],
        },
        {
            name: "David Kim",
            role: "Frontend Developer",
            team: "Engineering Team",
            email: "david.kim@example.com",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
            tags: ["React", "Performance", "UI"],
        },
        {
            name: "Eva Brown",
            role: "Backend Developer",
            team: "Engineering Team",
            email: "eva.brown@example.com",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg",
            tags: ["APIs", "Databases", "Security"],
        },
        {
            name: "Frank Green",
            role: "QA Engineer",
            team: "Quality Team",
            email: "frank.green@example.com",
            avatar: "https://randomuser.me/api/portraits/men/6.jpg",
            tags: ["Testing", "Automation", "Reliability"],
        },
        {
            name: "Grace Hall",
            role: "DevOps Engineer",
            team: "Infrastructure Team",
            email: "grace.hall@example.com",
            avatar: "https://randomuser.me/api/portraits/women/7.jpg",
            tags: ["CI/CD", "Cloud", "Monitoring"],
        },
        {
            name: "Henry Adams",
            role: "Data Scientist",
            team: "Data Team",
            email: "henry.adams@example.com",
            avatar: "https://randomuser.me/api/portraits/men/8.jpg",
            tags: ["Machine Learning", "Analytics", "Insights"],
        },
        {
            name: "Ivy Clark",
            role: "Scrum Master",
            team: "Agile Team",
            email: "ivy.clark@example.com",
            avatar: "https://randomuser.me/api/portraits/women/9.jpg",
            tags: ["Agile", "Facilitation", "Teamwork"],
        },
        {
            name: "Jack White",
            role: "Mobile Developer",
            team: "Engineering Team",
            email: "jack.white@example.com",
            avatar: "https://randomuser.me/api/portraits/men/10.jpg",
            tags: ["iOS", "Android", "UX"],
        },
        {
            name: "Kara Black",
            role: "Content Strategist",
            team: "Marketing Team",
            email: "kara.black@example.com",
            avatar: "https://randomuser.me/api/portraits/women/11.jpg",
            tags: ["Content", "SEO", "Branding"],
        },
        {
            name: "Liam Scott",
            role: "Full Stack Developer",
            team: "Engineering Team",
            email: "liam.scott@example.com",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
            tags: ["Node.js", "React", "APIs"],
        },
        {
            name: "Mia Turner",
            role: "HR Manager",
            team: "HR Team",
            email: "mia.turner@example.com",
            avatar: "https://randomuser.me/api/portraits/women/13.jpg",
            tags: ["People", "Culture", "Recruitment"],
        },
        {
            name: "Noah Walker",
            role: "Support Engineer",
            team: "Support Team",
            email: "noah.walker@example.com",
            avatar: "https://randomuser.me/api/portraits/men/14.jpg",
            tags: ["Customer", "Troubleshooting", "Empathy"],
        },
        {
            name: "Olivia Young",
            role: "Marketing Specialist",
            team: "Marketing Team",
            email: "olivia.young@example.com",
            avatar: "https://randomuser.me/api/portraits/women/15.jpg",
            tags: ["Campaigns", "Social Media", "Growth"],
        },
        {
            name: "Paul King",
            role: "Business Analyst",
            team: "Business Team",
            email: "paul.king@example.com",
            avatar: "https://randomuser.me/api/portraits/men/16.jpg",
            tags: ["Analysis", "Strategy", "Optimization"],
        },
        {
            name: "Quinn Baker",
            role: "Project Manager",
            team: "Project Team",
            email: "quinn.baker@example.com",
            avatar: "https://randomuser.me/api/portraits/women/17.jpg",
            tags: ["Planning", "Execution", "Delivery"],
        },
        {
            name: "Ryan Evans",
            role: "Security Engineer",
            team: "Security Team",
            email: "ryan.evans@example.com",
            avatar: "https://randomuser.me/api/portraits/men/18.jpg",
            tags: ["Security", "Compliance", "Risk"],
        },
        {
            name: "Sophie Harris",
            role: "Data Engineer",
            team: "Data Team",
            email: "sophie.harris@example.com",
            avatar: "https://randomuser.me/api/portraits/women/19.jpg",
            tags: ["ETL", "Pipelines", "Big Data"],
        },
        {
            name: "Tommy Lee",
            role: "Solutions Architect",
            team: "Architecture Team",
            email: "tommy.lee@example.com",
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            tags: ["Architecture", "Design", "Scalability"],
        },
        {
            name: "Uma Patel",
            role: "Research Scientist",
            team: "Research Team",
            email: "uma.patel@example.com",
            avatar: "https://randomuser.me/api/portraits/women/21.jpg",
            tags: ["Research", "Innovation", "Discovery"],
        },
    ]

    return (
        <div>
            <TopBar header="Community" setSearch={() => { }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {people.map((user, idx) => (
                    <UserCard key={idx} user={user} />
                ))}
            </div>
        </div>
    )
}
