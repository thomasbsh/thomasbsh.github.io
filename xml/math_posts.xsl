<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <xsl:for-each select="math/post">
            <div class="card">
                <article class="thread">
                    <div class="container">
                        <h4>
                            <b>
                                <xsl:value-of select="title" />
                            </b>
                        </h4>
                        <div style="text-align: start">
                            <b>Auteur(e) : </b>
                            <i>
                                <xsl:value-of select="author" />
                            </i>
                            <img
                                src="./img/pfp1.webp"
                                class="pfp"
                                alt="Photo de profil #1"
                            />
                            <br />
                            <b>Domaine d'études : </b>
                            <i>
                                <xsl:value-of select="field" />
                            </i>
                            <br />
                            <b>Date de publication : </b>
                            <i>
                                <xsl:value-of select="timestamp" />
                            </i>
                        </div>
                        <p>
                            <xsl:value-of select="content" />
                        </p>
                        <div style="text-align: start">
                            <b>Nombre de commentaires : </b>
                            <i id="nbComments"></i>
                            <br />
                            <xsl:for-each select="comments/comment">
                                <div class="comment">
                                    <b>Auteur(e) : </b>
                                    <xsl:value-of select="author" />
                                    <br />
                                    <b>Domaine d'études : </b>
                                    <xsl:value-of select="field" />
                                    <br />
                                    <b>Date de publication : </b>
                                    <xsl:value-of
                                        select="timestamp" />
                                    <br />
                                    <p>
                                        <xsl:value-of select="content" />
                                    </p>
                                </div>
                            </xsl:for-each>
                        </div>
                    </div>
                </article>
            </div>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>