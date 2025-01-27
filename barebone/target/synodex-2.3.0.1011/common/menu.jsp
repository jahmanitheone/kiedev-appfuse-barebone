<%@ include file="/common/taglibs.jsp"%>

<menu:useMenuDisplayer name="Velocity" config="cssHorizontalMenu.vm" permissions="rolesAdapter">
<ul id="primary-nav" class="menuList">
    <li class="pad">&nbsp;</li>
    <c:if test="${empty pageContext.request.remoteUser}"><li><a href="<c:url value="/login"/>" class="current"><fmt:message key="login.title"/></a></li></c:if>
    <menu:displayMenu name="MainMenu"/>
    <menu:displayMenu name="Step1"/>
    <menu:displayMenu name="Step2"/>
    <menu:displayMenu name="Step3"/>
    <menu:displayMenu name="UserMenu"/>
    <menu:displayMenu name="AdminMenu"/>
    <menu:displayMenu name="Logout"/>
</ul>
</menu:useMenuDisplayer>
