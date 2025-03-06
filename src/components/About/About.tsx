import React from "react";
import classes from "./About.module.css";

interface CustomCSSProperties extends React.CSSProperties {
  "--n"?: string;
}

export default function About() {
  return (
    <>
      <p className={classes.slashes}>//</p>
      <section tabIndex={0} id="about" className={classes.about_section}>
        <div className={classes.content}>
          <span
            className={classes.type}
            style={{ "--n": "1500" } as CustomCSSProperties}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onKeyDown={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          >
            Hello and welcome! I'm Noam Norman, a Full-Stack Developer with a
            strong foundation in both front-end and back-end technologies. I
            specialize in building web and mobile applications, working with
            modern frameworks like React, Astro, and Node.js.{"\n"}I hold a
            Bachelor's degree in Business Administration and Information Systems
            from the Ruppin Academic Center, where I graduated with a GPA of
            94.6.{"\n"}
            Currently, I work as a Full Stack Developer at the Israeli Ministry
            of Defense, developing web applications with React, Node.js,
            TypeScript, MSSQL, Elasticsearch, and more. I also teach and
            practice client-side development as a Lecturer at the Ruppin
            Academic Center.{"\n"}
            Beyond coding, I love solving complex problems, learning new
            technologies, and optimizing workflows. When I’m not working, you’ll
            find me exploring new places, enjoying music, or experimenting with
            new gadgets.{"\n"}
            Feel free to check out my{" "}
            <a
              rel="noreferrer"
              contentEditable={false}
              href="https://github.com/noamnorman21"
              target="_blank"
            >
              GitHub
            </a>
            , connect with me on{" "}
            <a
              rel="noreferrer"
              contentEditable={false}
              href="https://linkedin.com/in/noam-norman"
              target="_blank"
            >
              LinkedIn
            </a>
            , or reach out via email at{" "}
            <a contentEditable={false} href="mailto:normannoam21@gmail.com">
              normannoam21@gmail.com
            </a>
            .{"\n"}
            Always open to new opportunities and collaborations!
          </span>
        </div>
      </section>
    </>
  );
}
