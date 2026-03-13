import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import type { Profile, Project, CareerEntry } from "@/types";

// Register Korean font (react-pdf requires ttf/otf, not woff2)
Font.register({
  family: "Pretendard",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Medium.otf",
      fontWeight: 500,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-SemiBold.otf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf",
      fontWeight: 700,
    },
  ],
});

const colors = {
  primary: "#2563eb",
  text: "#1f2937",
  textSecondary: "#6b7280",
  textLight: "#9ca3af",
  border: "#e5e7eb",
  bg: "#f9fafb",
  white: "#ffffff",
  emerald: "#059669",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 9,
    color: colors.text,
    padding: "32 36",
    lineHeight: 1.5,
  },

  // Header
  header: {
    marginBottom: 20,
    borderBottom: `1.5 solid ${colors.primary}`,
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.text,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 8,
  },
  bio: {
    fontSize: 8.5,
    color: colors.textSecondary,
    lineHeight: 1.6,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  socialLink: {
    fontSize: 8,
    color: colors.primary,
    textDecoration: "none",
  },

  // Section
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    marginTop: 14,
    marginBottom: 8,
    borderBottom: `0.5 solid ${colors.border}`,
    paddingBottom: 3,
  },

  // Tech stack
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 4,
  },
  techCategory: {
    fontSize: 7.5,
    fontWeight: 600,
    color: colors.textSecondary,
    marginRight: 4,
    textTransform: "uppercase",
  },
  techBadge: {
    fontSize: 7.5,
    color: colors.textSecondary,
    backgroundColor: colors.bg,
    padding: "1.5 5",
    borderRadius: 3,
    border: `0.5 solid ${colors.border}`,
  },

  // Career entry
  careerEntry: {
    marginBottom: 10,
  },
  careerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  careerTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.text,
  },
  careerPeriod: {
    fontSize: 8,
    color: colors.textLight,
  },
  careerOrg: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  careerDesc: {
    fontSize: 8,
    color: colors.textSecondary,
    marginLeft: 8,
    marginBottom: 1.5,
  },
  careerTech: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 3,
  },

  // Project
  projectEntry: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.text,
  },
  projectRole: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: 500,
  },
  projectDesc: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  achievement: {
    fontSize: 8,
    color: colors.emerald,
    fontWeight: 500,
    marginLeft: 8,
    marginBottom: 1,
  },

  // Bullet
  bullet: {
    flexDirection: "row",
    marginBottom: 1.5,
  },
  bulletDot: {
    fontSize: 8,
    color: colors.textLight,
    marginRight: 4,
    marginTop: -0.5,
  },
  bulletText: {
    fontSize: 8,
    color: colors.textSecondary,
    flex: 1,
  },
});

interface ResumeDocumentProps {
  profile: Profile;
  projects: Project[];
  workExperience: CareerEntry[];
  education: CareerEntry[];
  awards: CareerEntry[];
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

function TechBadges({ items }: { items: string[] }) {
  return (
    <View style={s.techRow}>
      {items.map((tech) => (
        <Text key={tech} style={s.techBadge}>
          {tech}
        </Text>
      ))}
    </View>
  );
}

export default function ResumeDocument({
  profile,
  projects,
  workExperience,
  education,
  awards,
}: ResumeDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.name}>{profile.name}</Text>
          <Text style={s.tagline}>{profile.tagline}</Text>
          {profile.bio.map((line) => (
            <Text key={line} style={s.bio}>
              {line}
            </Text>
          ))}
          <View style={s.socialRow}>
            {profile.social.map((link) => (
              <Link key={link.platform} src={link.url} style={s.socialLink}>
                {link.platform}: {link.url.replace("mailto:", "")}
              </Link>
            ))}
          </View>
        </View>

        {/* Tech Stack */}
        <View>
          <Text style={s.sectionTitle}>Skills</Text>
          {profile.techStack.map((cat) => (
            <View
              key={cat.category}
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
            >
              <Text style={s.techCategory}>{cat.category}</Text>
              <TechBadges items={cat.items} />
            </View>
          ))}
        </View>

        {/* Experience */}
        {workExperience.length > 0 && (
          <View>
            <Text style={s.sectionTitle}>Experience</Text>
            {workExperience.map((entry) => (
              <View key={entry.id} style={s.careerEntry}>
                <View style={s.careerHeader}>
                  <Text style={s.careerTitle}>{entry.title}</Text>
                  <Text style={s.careerPeriod}>{entry.period}</Text>
                </View>
                <Text style={s.careerOrg}>{entry.organization}</Text>
                {entry.description.map((desc) => (
                  <Bullet key={desc} text={desc} />
                ))}
                {entry.techStack && entry.techStack.length > 0 && (
                  <View style={s.careerTech}>
                    <TechBadges items={entry.techStack} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        <View>
          <Text style={s.sectionTitle}>Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={s.projectEntry}>
              <View style={s.projectHeader}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={s.projectTitle}>{project.title}</Text>
                  {project.role && (
                    <Text style={s.projectRole}>{project.role}</Text>
                  )}
                </View>
                {project.period && (
                  <Text style={s.careerPeriod}>{project.period}</Text>
                )}
              </View>
              <Text style={s.projectDesc}>{project.description}</Text>

              {project.achievements && project.achievements.length > 0 && (
                <View>
                  {project.achievements.map((a) => (
                    <Text key={a} style={s.achievement}>
                      ↗ {a}
                    </Text>
                  ))}
                </View>
              )}

              <TechBadges items={project.techStack} />
            </View>
          ))}
        </View>

        {/* Awards */}
        {awards.length > 0 && (
          <View>
            <Text style={s.sectionTitle}>Awards</Text>
            {awards.map((entry) => (
              <View key={entry.id} style={s.careerEntry}>
                <View style={s.careerHeader}>
                  <Text style={s.careerTitle}>{entry.title}</Text>
                  <Text style={s.careerPeriod}>{entry.period}</Text>
                </View>
                <Text style={s.careerOrg}>{entry.organization}</Text>
                {entry.description.map((desc) => (
                  <Bullet key={desc} text={desc} />
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View>
            <Text style={s.sectionTitle}>Education</Text>
            {education.map((entry) => (
              <View key={entry.id} style={s.careerEntry}>
                <View style={s.careerHeader}>
                  <Text style={s.careerTitle}>{entry.title}</Text>
                  <Text style={s.careerPeriod}>{entry.period}</Text>
                </View>
                <Text style={s.careerOrg}>{entry.organization}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
