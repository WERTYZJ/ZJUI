<template>
  <div>
    <ZJMain>
      <template #header>
        <h2>ZJAnchor(锚点)</h2>
      </template>
      <h3>锚点用来展示上下滑动的进程情况</h3>
      <p>CalendarVal传递日历数据</p>
      <p>:leftMenu="leftMenu" 左侧导航栏数据，分为label和value。</p>
      <p>:rightMenu="rightMenu" 右侧导航展开的数据，分为标题title和主题text。</p>
      <div class="ZJDisplayFlex m-t-10">
        <ZJAnchor
          :leftMenu="leftMenu"
          :rightMenu="rightMenu"
          >
        </ZJAnchor>
      </div>
      <ZJCodeDisplay :code="vueCode" language="vue" />
    </ZJMain>
  </div>
</template>

<script setup>
import { ref } from "vue";

const leftMenu = ([
  {
    label:"Global Top Tutor Network",
    value:1,
  },
  {
    label:"Personalized Learning Pathways",
    value:2,
  },
  {
    label:"Flexible Learning Modes",
    value:3,
  },
  {
    label:"Interaction and Engagement",
    value:4,
  },
  {
    label:"Cross-Cultural Exchange",
    value:5,
  },
  {
    label:"Ongoing Support and Resources",
    value:6,
  },
  {
    label:"Quality Assurance",
    value:7,
  },
  {
    label:"Mission",
    value:8,
  },
  {
    label:"Vision",
    value:9,
  },
])

const rightMenu = [
  {
    title: "Global Top Tutor Network",
    text: "ZJUI ensures learners receive the highest standard of teaching and guidance by carefully selecting top tutors worldwide. Our tutors are not only experts in their fields but also excel in online teaching, offering personalized and efficient learning experiences. At ZJUI, students can find the most suitable tutors and courses for their learning needs and interests, whether it be in arts and hobbies, language learning, programming skills, academic tutoring, or vocational education, and more."
  },
  {
    title: "Personalized Learning Pathways",
    text: "Utilizing advanced matching algorithms, ZJUI recommends the most suitable tutors and courses for each learner's needs and goals. We believe personalized learning plans significantly improve learning efficiency and outcomes."
  },
  {
    title: "Flexible Learning Modes",
    text: "At ZJUI, learners can arrange their courses flexibly according to their schedules, finding the right approach whether it's intensive, concentrated learning or distributed learning. This flexibility allows learning to better integrate into busy lives."
  },
  {
    title: "Interaction and Engagement",
    text: "With the latest technology, ZJUI provides an interactive learning platform that enriches and engages the online learning experience through video conferencing, real-time feedback, and interactive learning tools."
  },
  {
    title: "Cross-Cultural Exchange",
    text: "As a global learning platform, ZJUI encourages and facilitates cross-cultural exchange. Learners can not only acquire new skills and knowledge but also gain perspectives from different cultures, broadening their horizons."
  },
  {
    title: "Ongoing Support and Resources",
    text: "ZJUI offers continuous learning support and a rich resource library, including the latest learning materials, industry trends, and professional development tools. We are committed to supporting learners at every step of their learning journey, helping them achieve their goals."
  },
  {
    title: "Quality Assurance",
    text: "ZJUI is committed to providing high-quality educational services. From the selection of tutors to course design, we adhere to strict quality standards to ensure learners achieve the best learning outcomes. These unique value propositions together form ZJUI's core competitive strength, making it the preferred online education platform for individuals and professionals seeking knowledge and skill enhancement."
  },
  {
    title: "Mission",
    text: "ZJUI's mission is to provide personalized, high-quality learning experiences through our innovative online education platform, enabling everyone to access top-tier educational resources without barriers. We are dedicated to breaking down geographical and financial barriers, helping learners worldwide to improve themselves and pursue their dreams, no matter where they are."
  },
  {
    title: "Vision",
    text: "ZJUI envisions becoming the world's leading online education platform, redefining the standards of remote education. By continuously innovating in technology and offering high-quality educational text, we aim to ignite a passion for learning and foster a habit of lifelong learning. In the world of ZJUI, everyone has the opportunity to become a master in their field of interest, building a global community of knowledge sharing and skill enhancement together."
  }
]

const vueCode=ref(
`<template>
  <ZJAnchor
    :leftMenu="leftMenu"
    :rightMenu="rightMenu"
    >
  </ZJAnchor>
</template>

<script setup>
import { ref } from "vue";

const leftMenu = ([
  {
    label:"Global Top Tutor Network",
    value:1,
  },
  {
    label:"Personalized Learning Pathways",
    value:2,
  },
  {
    label:"Flexible Learning Modes",
    value:3,
  },
  {
    label:"Interaction and Engagement",
    value:4,
  },
  {
    label:"Cross-Cultural Exchange",
    value:5,
  },
  {
    label:"Ongoing Support and Resources",
    value:6,
  },
  {
    label:"Quality Assurance",
    value:7,
  },
  {
    label:"Mission",
    value:8,
  },
  {
    label:"Vision",
    value:9,
  },
])

const rightMenu = [
  {
    title: "Global Top Tutor Network",
    text: "ZJUI ensures learners receive the highest standard of teaching and guidance by carefully selecting top tutors worldwide. Our tutors are not only experts in their fields but also excel in online teaching, offering personalized and efficient learning experiences. At ZJUI, students can find the most suitable tutors and courses for their learning needs and interests, whether it be in arts and hobbies, language learning, programming skills, academic tutoring, or vocational education, and more."
  },
  {
    title: "Personalized Learning Pathways",
    text: "Utilizing advanced matching algorithms, ZJUI recommends the most suitable tutors and courses for each learner's needs and goals. We believe personalized learning plans significantly improve learning efficiency and outcomes."
  },
  {
    title: "Flexible Learning Modes",
    text: "At ZJUI, learners can arrange their courses flexibly according to their schedules, finding the right approach whether it's intensive, concentrated learning or distributed learning. This flexibility allows learning to better integrate into busy lives."
  },
  {
    title: "Interaction and Engagement",
    text: "With the latest technology, ZJUI provides an interactive learning platform that enriches and engages the online learning experience through video conferencing, real-time feedback, and interactive learning tools."
  },
  {
    title: "Cross-Cultural Exchange",
    text: "As a global learning platform, ZJUI encourages and facilitates cross-cultural exchange. Learners can not only acquire new skills and knowledge but also gain perspectives from different cultures, broadening their horizons."
  },
  {
    title: "Ongoing Support and Resources",
    text: "ZJUI offers continuous learning support and a rich resource library, including the latest learning materials, industry trends, and professional development tools. We are committed to supporting learners at every step of their learning journey, helping them achieve their goals."
  },
  {
    title: "Quality Assurance",
    text: "ZJUI is committed to providing high-quality educational services. From the selection of tutors to course design, we adhere to strict quality standards to ensure learners achieve the best learning outcomes. These unique value propositions together form ZJUI's core competitive strength, making it the preferred online education platform for individuals and professionals seeking knowledge and skill enhancement."
  },
  {
    title: "Mission",
    text: "ZJUI's mission is to provide personalized, high-quality learning experiences through our innovative online education platform, enabling everyone to access top-tier educational resources without barriers. We are dedicated to breaking down geographical and financial barriers, helping learners worldwide to improve themselves and pursue their dreams, no matter where they are."
  },
  {
    title: "Vision",
    text: "ZJUI envisions becoming the world's leading online education platform, redefining the standards of remote education. By continuously innovating in technology and offering high-quality educational text, we aim to ignite a passion for learning and foster a habit of lifelong learning. In the world of ZJUI, everyone has the opportunity to become a master in their field of interest, building a global community of knowledge sharing and skill enhancement together."
  }
]
<script>
`)
</script>
