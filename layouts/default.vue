<template>
  <UApp>
    <AppAlert />
    <Header />

    <UContainer
      class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-50 pt-4 dark:from-gray-900 dark:to-gray-800"
    >
      <NuxtPage />
    </UContainer>

    <Footer />
  </UApp>
</template>
