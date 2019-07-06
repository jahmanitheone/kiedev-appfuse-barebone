AppFuse Basic Spring MVC Archetype
--------------------------------------------------------------------------------
1. Go tom pom.xml deployment directory, example
	cd C:\dev\workspacesynodexqcai\synodexqcai-web\

2. Compile app by running:
   mvn -P development -DskipTests=true compile
   or
   mvn -P local -DskipTests=true compile

3. Run jetty
   	mvn -DskipTests=true -P local jetty:run -Djetty.port=8084
   	or
   	mvn -DskipTests=true -P development jetty:run -Djetty.port=8084

3. Access app:
	http://localhost:8084/