import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#0f62fe",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />
      <Tabs.Screen
        name="aulas - API"
        options={{
          title: "API",
          headerTitle: "Conteúdo - API",
        }}
      />
      <Tabs.Screen
        name="post - API"
        options={{
          title: "API",
          headerTitle: "Conteúdo - API",
        }}
      />
      <Tabs.Screen
        name="jogo - API"
        options={{
          title: "API",
          headerTitle: "jogo - API",
        }}
      />
    </Tabs>
  );
}
